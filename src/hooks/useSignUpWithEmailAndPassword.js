import { auth, fireStore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { collection, query, setDoc, where, getDocs, doc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import useAuthStore from "../store/authstore";
import { sendEmailVerification } from "firebase/auth";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
  const showToast = useToast();
  const loginUser = useAuthStore((state) => state.login);

  const signUp = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.userName || !inputs.fullName) {
      showToast({
        description: "Please fill all the fields",
        status: "error",
        title: "Error",
      });
      return;
    }

    const userRef = collection(fireStore, "users");
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
      const userCredential = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      const user = userCredential.user;
      
      await sendEmailVerification(user);

      const userDoc = {
        uid: user.uid,
        email: inputs.email,
        fullName: inputs.fullName,
        userName: inputs.userName,
        bio: "",
        profilePicURL: "",
        followers: [],
        followings: [],
        posts: [],
        createdAt: Date.now(),
        emailVerified: user.emailVerified,
      };

      await setDoc(doc(fireStore, "users", user.uid), userDoc);
      localStorage.setItem("instUser", JSON.stringify(userDoc));
      loginUser(userDoc);

      showToast({
        description: `Verification email sent to ${inputs.email}. Please verify your email before logging in.`,
        status: "success",
        title: "Success",
      });
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
