import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import SuggestedUser from "../SuggestedBox/SuggestedUser";
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../../firebase/firebase";

const getUserProfileById = async (userId) => {
  const userRef = doc(fireStore, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  }
  throw new Error("User not found");
};

const FollowersModal = ({ isOpen, onClose, title, userIds }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setProfiles([]);
      try {
        const profilePromises = userIds.map((userId) => getUserProfileById(userId));
        const fetchedProfiles = await Promise.all(profilePromises);
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && userIds.length > 0) {
      fetchProfiles();
    }
  }, [isOpen, userIds]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            {loading ? (
              <Spinner />
            ) : profiles.length > 0 ? (
              profiles.map((profile) => (
                <SuggestedUser key={profile.uid} user={profile} setUser={setProfiles} />
              ))
            ) : (
              <Text>No users found.</Text>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FollowersModal;
