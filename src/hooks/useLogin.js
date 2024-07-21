import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, fireStore } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useAuthStore from "../store/authstore";
import { reload } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please enter your email and password", "error");
    }

    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

      if (!userCred) {
        throw new Error('Failed to sign in user');
      }

      const user = userCred.user;

      // Reload the user to get the updated email verification status
      await reload(user);

      if (!user.emailVerified) {
        navigate('/verify-email'); // Redirect to verification page
        return;
      }

      const docRef = doc(fireStore, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Update the Firestore document with email verification status
        await updateDoc(docRef, { emailVerified: user.emailVerified });
      }

      const userData = {
        ...docSnap.data(),
        emailVerified: user.emailVerified,
      };

      loginUser(userData);

      showToast("Success", `Welcome Back ${userData.userName}`, "success");
    } catch (error) {
      console.error('Login error:', error);
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error: error ? error.message : null, login };
};

export default useLogin;
