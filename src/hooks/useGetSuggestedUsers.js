import { useEffect, useState } from "react";
import useAuthStore from "../store/authstore";
import useShowToast from "./useShowToast";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { where } from "firebase/firestore";
import { limit } from 'firebase/firestore';

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const userRef = collection(fireStore, "users");
        const q = query(
          userRef,
          where("uid", "not-in", [authUser.uid, ...authUser.followings]),
          orderBy("uid"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({...doc.data(), id: doc.id});
        });

        setSuggestedUsers(users);


      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getSuggestedUsers();
  }, [authUser]);
  return {
    isLoading,
    suggestedUsers,
  };
};

export default useGetSuggestedUsers;
