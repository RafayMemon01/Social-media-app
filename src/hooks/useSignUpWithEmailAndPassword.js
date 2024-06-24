import { auth, fireStore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Firestore, collection, query, setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import useAuthStore from "../store/authstore";
import { where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useToast();
  const loginUser = useAuthStore((state) => state.login);

  const signUp = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.userName ||
      !inputs.fullName
    ) {
      showToast({
        description: "Please fill all the fields",
        status: "error",
        title: "Error",
      });
      return;
    }

    const userRef = collection(fireStore,"users")
    const q = query(userRef, where("userName", "==", inputs.userName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      showToast({
        description: "Username already exists",
        status: "error",
        title: "Error",
      });
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) {
        showToast({
          description: "error with creating user",
          status: "error",
          title: "Error",
        });
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          fullName: inputs.fullName,
          userName: inputs.userName,
          bio: "",
          profilePicURL: "",
          followers: [],
          followings: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("instUser", JSON.stringify(userDoc));
        loginUser(userDoc);
        showToast({
          description: `Welcome ${inputs.userName}`,
          status: "success",
          title: "Success",
        });
      }
    } catch (error) {
      showToast({
        description: "Unknown error, retry later",
        status: "error",
        title: "Error",
      });
    }
  };
  return { loading, error, signUp };
};

export default useSignUpWithEmailAndPassword;
