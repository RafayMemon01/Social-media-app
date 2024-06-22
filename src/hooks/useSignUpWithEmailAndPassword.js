import { auth, fireStore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
    const showToast = useToast()

  const signUp = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.userName ||
      !inputs.fullName
    ) {
      showToast({
        description: 'Please fill all the fields',
        status: 'error',
        title: 'Error',
      })
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) {
        showToast({
          description: 'error with creating user',
          status: 'error',
          title: 'Error',
        })
        return;
      }
      if(newUser){
        const userDoc = {
            uid: newUser.user.uid,
            email: inputs.email,
            fullName: inputs.fullName,
            userName: inputs.userName,
            bio:'',
            profilePicURL:'',
            followers:[],
            followings:[],
            posts:[],
            createdAt: Date.now()
        }
        await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("instUser",JSON.stringify(userDoc))
        showToast({
            description:`Welcome ${inputs.userName}`,
            status:'success',
            title:'Success'
        })
      }
    } catch (error) {
        showToast({
            description: 'Unknown error, retry later',
            status: 'error',
            title: 'Error',
          })
    }
  };
  return { loading, error, signUp };
};

export default useSignUpWithEmailAndPassword;
