import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast"
import { auth, fireStore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authstore";

const useLogin = () => {
  const showToast = useShowToast()
  const loginUser = useAuthStore((state)=>state.login)

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      const login = async (inputs) => {
        if(!inputs.email || !inputs.password){
            return showToast("Error", "Please enter your email and password","error");
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
            if(userCred){
                const docRef = doc(fireStore, "users", userCred.user.uid)
                const docSnap = await getDoc(docRef);
                localStorage.setItem("instUser",JSON.stringify(docSnap.data()));
                loginUser(docSnap.data())
                showToast(
                   "Success",
                   `Welcome Back ${docSnap.data().userName}`,
                   "success",
                );

            }
        } catch (error) {
            showToast("Error",error.message,"error");
        }
      };
      return {loading, error, login}
}

export default useLogin
