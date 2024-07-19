import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { doc } from "firebase/firestore";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedsComponent/FeedPost/PostFooter";
import userProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authstore";
import useShowToast from "../../hooks/useShowToast";
import { fireStore, storage } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";
import { deleteObject, ref } from "firebase/storage";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = userProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = userProfileStore((state) => state.deletePost);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      setIsDeleting(true);
      const imageRef = ref(storage, `post/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(fireStore, "users", userProfile.uid);
      await deleteDoc(doc(fireStore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      deletePost(post.id);
      decrementPostsCount(post.id);

      showToast("Post Deleted", "", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          bottom={0}
          right={0}
          bg={"blackAlpha.700"}
          transition={"all .3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="profile post"
          h={"100%"}
          w={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={5}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post?.imageURL} alt="Profile Post" />
              </Flex>
              <Flex
                flex={1}
                flexDirection={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex justifyContent={"space-between"}>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Avatar
                      src={userProfile?.profilePicURL}
                      size={"sm"}
                      name="RHM Web Developer"
                    />
                    <Text fontSize={12} fontWeight={"bold"}>
                      {userProfile?.userName}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile?.uid && (
                    <Button
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      onClick={handleDeletePost}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                {post.caption&&(
                  <>
                    <Divider my={2} bg={"gray.500"} />
                    <Caption post={post} />
                  </>)
                }
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  gap={5}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {post?.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter post={post} isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
