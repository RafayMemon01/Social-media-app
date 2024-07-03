import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authstore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth/web-extension";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if(!result){
        showToast("Error",error.message,"error")
        return;
      }
      const userRef = doc(fireStore,"users",result.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
       const userDoc = userSnap.data();
       localStorage.setItem("instUser",JSON.stringify(userDoc));
       loginUser(userDoc)
      } else{
        const user = result.user;
        const userDoc = {
          uid: user.uid,
          email: user.email,
          userName: user.email.split("@")[0],
          fullName: user.displayName,
          bio: "",
          profilePicURL: user.photoURL,
          followers: [],
          followings: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(fireStore, "users", user.uid), userDoc);
        localStorage.setItem("instUser", JSON.stringify(userDoc));
        loginUser(userDoc);
        showToast(
           "Success",
           `Welcome ${user.displayName}`,
           "success",
        );
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  

  return (<>
    <Flex alignItems={"center"} isDisable={loading} isLoading={loading} cursor={"pointer"} onClick={handleGoogleAuth}>
      <Image draggable={false} src="/google.png" w={5} alt="Google Logo" />
      <Text color={"blue.500"} mx={2}>
        {prefix} with Google
      </Text>
    </Flex>
    
  </>
  );
};

export default GoogleAuth;
