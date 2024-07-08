import { useState } from "react";
import useAuthStore from "../store/authstore";
import useShowToast from "./useShowToast";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { fireStore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import userProfileStore from "../store/userProfileStore";

const userEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const userAuth = useAuthStore((state) => state.user);
  const setUserAuth = useAuthStore((state) => state.setUser);
  const setUserProfile = userProfileStore((state) => state.setUserProfile);
  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !userAuth) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${userAuth.uid}`);
    const userDoc = doc(fireStore, "users", userAuth.uid);

    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(storageRef);
      }
      const userToBeUpdated = {
        fullName: inputs.fullname || userAuth.fullName,
        userName: inputs.username || userAuth.username,
        bio: inputs.bio || userAuth.bio,
        profilePicURL: URL || userAuth.profilePicURL
      };
      
      // Remove undefined fields
      const filteredUpdatedUser = Object.fromEntries(
        Object.entries(userToBeUpdated).filter(([_, v]) => v !== undefined)
      );

      await updateDoc(userDoc, filteredUpdatedUser);
      
      const updatedUser = {
        ...userAuth,
        ...filteredUpdatedUser
      };

      localStorage.setItem("instUser", JSON.stringify(updatedUser));
      setUserAuth(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "Profile updated successfully", "success");

    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    editProfile,
    isUpdating
  };
};

export default userEditProfile;
