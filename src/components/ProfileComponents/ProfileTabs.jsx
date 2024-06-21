import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

const ProfileTabs = () => {
  return (
    <Flex
      width={"full"}
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      <Flex
        alignItems={"center"}
        borderTop={"1px solid white"}
        p={"3"}
        gap={"1"}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsGrid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Posts
        </Text>
      </Flex>

      <Flex alignItems={"center"} p={"3"} gap={"1"} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsBookmark />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Saved
        </Text>
      </Flex>

      <Flex alignItems={"center"} p={"3"} gap={"1"} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsSuitHeart />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Likes
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileTabs;
