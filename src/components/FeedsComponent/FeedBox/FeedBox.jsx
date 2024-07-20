import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import FeedPost from "../FeedPost/FeedPost";
import useGetFeedPosts from "../../../hooks/useGetFeedPosts";
// import SuggestionsBox from "../../SuggestedBox/SuggestionsBox";
import useAuthStore from "../../../store/authstore";
import { useEffect } from "react";

const FeedBox = () => {
  const { isLoading, posts } = useGetFeedPosts();
  const authUser = useAuthStore((state)=>state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (!isLoading && authUser.followings < 2) {
      console.log("Load complete, checking followings...");
      const timer = setTimeout(() => {
        console.log("Few followings detected, opening modal...");
        onOpen();
      }, 7000); // 7 seconds delay
      return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
    }
  }, [isLoading, authUser.followings, onOpen]);


  return (
    <>
    <Container maxWidth={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={"10px"} width={"200px"} />
                <Skeleton height={"10px"} width={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box height={"400px"}>content wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <>
        <Flex flexDir={'column'} alignItems={'center'} justifyContent={"center"}>
            <Text fontSize={"xxx-large"}>😐</Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Dayuum. Look like you don&apos;t have any Friends.
          </Text>
          <Text fontSize={"sm"} color={"red.400"}>
            Stop Coding and Go Make Some!!
          </Text>
        </Flex>
        
        </>
      )}
      
      
        
      
    </Container>
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
    <ModalOverlay />
    <ModalContent
    bg={'black'}
    border={'1px solid gray'}
    maxW={'480px'}
    >
      <ModalHeader>Few Followers</ModalHeader>
      <ModalBody>
        <Text>Looks like you have few followers. Make more friends to see a better feed.</Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
  );
};

export default FeedBox;
