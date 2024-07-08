import { useEffect, useState } from "react";
import useAuthStore from "../store/authstore";
import useShowToast from "./useShowToast";
import userProfileStore from "../store/userProfileStore";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { arrayUnion } from "firebase/firestore";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowings, setIsFollowing] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = userProfileStore();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(fireStore, "users", authUser?.uid);
      const userToFollowRef = doc(fireStore, "users", userId);

      await updateDoc(currentUserRef, {
        followings: isFollowings ? arrayRemove(userId) : arrayUnion(userId),
      });
      await updateDoc(userToFollowRef, {
        followers: isFollowings ? arrayRemove(authUser?.uid) : arrayUnion(authUser?.uid),
      });

      if (isFollowings) {
        //unFollow
        setAuthUser({
            ...authUser,
            followings: authUser?.followings.filter((uid) => uid !== userId),
          });
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uid) => uid !== authUser?.uid),
          });
        localStorage.setItem(
          "instUser",
          JSON.stringify({
            ...authUser,
            followings: authUser?.followings.filter((uid) => uid !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        //follow
        setAuthUser({
          ...authUser,
          followings: [...authUser?.followings, userId],
        });
        setUserProfile({
          ...userProfile,
          followers: [...userProfile.followers, authUser?.uid],
        });
        localStorage.setItem(
          "instUser",
          JSON.stringify({
            ...authUser,
            followings: [...authUser?.followings, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser?.followings?.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);
  return { isUpdating, isFollowings, handleFollowUser };
};

export default useFollowUser;
