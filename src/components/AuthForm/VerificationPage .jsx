import React, { useState } from 'react';
import { Button, Alert, AlertIcon } from "@chakra-ui/react";
import { auth, fireStore } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { reload } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useAuthStore from "../../store/authstore";

const VerificationPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleRecheck = async () => {
    try {
      setIsVerifying(true);
      
      const user = auth.currentUser;
      await reload(user);

      if (user.emailVerified) {
        const userDocRef = doc(fireStore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = {
            ...userDocSnap.data(),
            emailVerified: user.emailVerified,
          };
          await updateDoc(userDocRef, { emailVerified: user.emailVerified });
          setUser(userData);
          navigate('/');
        } else {
          throw new Error('User data not found in Firestore.');
        }
      } else {
        alert("Email is not verified yet. Please check your email.");
      }
    } catch (error) {
      console.error("Verification error:", error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Alert status="warning">
        <AlertIcon />
        Please verify your email to continue.
      </Alert>
      <Button isLoading={isVerifying} onClick={handleRecheck} colorScheme="blue" mt={4}>
        Recheck Verification
      </Button>
    </div>
  );
};

export default VerificationPage;
