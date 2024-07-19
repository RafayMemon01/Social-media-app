import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  Text,
} from "@chakra-ui/react";
import FeedPost from "../FeedPost/FeedPost";
import useGetFeedPosts from "../../../hooks/useGetFeedPosts";

const FeedBox = () => {
  const { isLoading, posts } = useGetFeedPosts();
  return (
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
  );
};

export default FeedBox;
