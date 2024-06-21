import { Avatar, AvatarGroup, Button, Flex, Text, VStack } from "@chakra-ui/react";

const ProfileHeader = () => {
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
          name="RHM Web Solutions"
          src="/profilepic.png"
          alt="RHM Web Solutions"
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
          <Text fontSize={{ base: "sm", md: "lg" }}>RHM Web Solutions</Text>
          <Button
            bg="white"
            color="black"
            _hover={{ bg: 'whiteAlpha.800' }}
            size={{ base: 'xs', md: 'sm' }}
          >
            Edit Profile
          </Button>
        </Flex>

        <Flex justifyContent="center" alignItems="center" gap={4}>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight="bold" mr={1}>4</Text>
            Posts
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight="bold" mr={1}>100</Text>
            Followers
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight="bold" mr={1}>79</Text>
            Following
          </Text>
        </Flex>
        <Text fontSize="sm" fontWeight="bold">RHM</Text>
        <Text fontSize="sm">Let us help to grow your business with a website</Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
