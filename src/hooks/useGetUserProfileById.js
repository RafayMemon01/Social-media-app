import React, { useEffect } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfileById = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = doc(fireStore, "users", userId); // Correct reference to the document
        const userSnap = await getDoc(userRef); // Get the document snapshot

        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        } else {
          showToast("Error", "User not found", "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfileById();
  }, [showToast, setIsLoading, userId]);
  return {
    isLoading,
    userProfile,
  };
};

export default useGetUserProfileById;
