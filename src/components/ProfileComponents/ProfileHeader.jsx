import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from "@chakra-ui/react";
import userProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authstore";
import EditProfile from "./EditProfile";

const ProfileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {userProfile} = userProfileStore();
  const authUser = useAuthStore((state)=>state.user)
  const visitingOwnProfileAndAuth = authUser && authUser.userName === userProfile.userName
  const visitingAnotherProfileAndAuth = authUser && authUser.userName !== userProfile.userName
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      alignItems="center"
      justifyContent="center"
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        mx="auto"
      >
        <Avatar
          name={userProfile?.userName}
          src={userProfile?.profilePicURL}
          alt={userProfile?.userName}
        />
      </AvatarGroup>
      <VStack gap={2} flex={1} mx="auto" alignItems="start">
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems="center"
          width="full"
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile?.userName}</Text>
          {visitingAnotherProfileAndAuth && <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            size={{ base: "xs", md: "sm" }}
          >
            Follow
          </Button>}
          {visitingOwnProfileAndAuth && <Button
            bg="white"
            color="black"
            _hover={{ bg: "whiteAlpha.800" }}
            size={{ base: "xs", md: "sm" }}
            onClick={onOpen}
          >
            Edit Profile
          </Button>}
          
        </Flex>

        <Flex justifyContent="center" alignItems="center" gap={4}>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight="bold" mr={1}>{userProfile?.posts.length}</Text>
            Posts
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight="bold" mr={1}>{userProfile?.followers.length}</Text>
            Followers
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight="bold" mr={1}>{userProfile?.followings.length}</Text>
            Following
          </Text>
        </Flex>
        <Text fontSize="sm" fontWeight="bold">{userProfile?.fullName}</Text>
        <Text fontSize="sm">{userProfile?.bio}</Text>
      </VStack>
      {isOpen&&<EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
