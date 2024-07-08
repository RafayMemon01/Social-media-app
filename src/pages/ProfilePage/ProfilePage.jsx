import {
  Container,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";
import ProfileTabs from "../../components/ProfileComponents/ProfileTabs";
import ProfilePosts from "../../components/ProfileComponents/ProfilePosts";
import useGetUserProfileWithUserName from "../../hooks/userGetUserProfileWithUserName";
import { useParams, Link as RouterLink } from "react-router-dom";

const ProfilePage = () => {
  let { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileWithUserName(username);
  const userNotFound = !isLoading && !userProfile;

  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxWidth={"container.lg"} py={5}>
      {/* ---------------------Profile Header-------------------- */}
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        flexDirection={"column"}
        mx={"auto"}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>

      {/* ---------------------Profile Tabs and Posts-------------------- */}
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.400"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const UserNotFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>Sorry, this page isn't available.</Text>
      <Text>
        The link you followed may be broken, or the page may have been
        removed.
      </Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go back to Home      </Link>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />
      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};
