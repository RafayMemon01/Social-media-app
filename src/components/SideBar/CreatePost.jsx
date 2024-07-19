import { getDownloadURL } from "firebase/storage";
import { addDoc, arrayUnion, collection } from "firebase/firestore";
import { useRef } from "react";
import { useState } from "react";
import {
  CloseButton,
  Image,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/contants";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authstore";
import userProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { fireStore, storage } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import usePostStore from "../../store/postStore";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { handleCreatePost, isLoading } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
              onClick={() => imageRef.current.click()}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="preview" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => setSelectedFile(null)}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={handlePostCreation} isLoading={isLoading} mr={3}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const { createPost } = usePostStore();
  const { addPost } = userProfileStore();
  const { userProfile } = userProfileStore();

  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("No file selected");
    setIsLoading(true);

    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(fireStore, "posts"), newPost);
      const userDoc = doc(fireStore, "users", authUser.uid);
      const imageRef = ref(storage, `post/${postDocRef.id}`);

      await updateDoc(userDoc, {
        posts: arrayUnion(postDocRef.id),
      });
      await uploadString(imageRef, selectedFile, "data_url");

      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(postDocRef, { imageURL: downloadURL });
      newPost.imageURL = downloadURL;

      if(userProfile.uid === authUser.uid) addPost({...newPost,id: postDocRef.id,});
      if(pathname !== '/' && userProfile.uid === authUser.uid ) createPost({...newPost, id: postDocRef.id,});

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreatePost, isLoading };
}
