import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import userProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useGetUserProfileWithUserName = (userName) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = userProfileStore();

  useEffect(() => {
    if (!userName) return;
    
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(fireStore, "users"),
          where("userName", "==", userName)
        );
        const qSnapshot = await getDocs(q);

        if (qSnapshot.empty) {
          setUserProfile(null);
        } else {
          let userDoc;
          qSnapshot.forEach((doc) => {
            userDoc = doc.data();
          });

          setUserProfile(userDoc);
        }
      } catch (err) {
        showToast("Error", "Error getting user profile", "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [userName, setUserProfile, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileWithUserName;
