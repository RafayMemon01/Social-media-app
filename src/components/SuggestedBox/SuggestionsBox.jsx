import { Link, Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SuggestionHeader from "./SuggestionHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestionsBox = () => {
  return (
    <VStack py={8} gap={4}>
      <SuggestionHeader />
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"full"}
      >
        <Text fontSize={12} color={"gray.500"} fontWeight={"bold"}>
          Suggested for you
        </Text>

        <Text
          fontSize={12}
          fontWeight={"bold"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See All
        </Text>
      </Flex>
      <SuggestedUser name="Dan Abrahmov" followers={2000} avatar="https://bit.ly/den-abramov" />
      <SuggestedUser name="Dan Abrahmov" followers={2000} avatar="https://bit.ly/den-abramov" />
      <SuggestedUser name="Dan Abrahmov" followers={2000} avatar="https://bit.ly/den-abramov" />
      

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        &copy; 2024 Built By {""}
        <Link href="https://github.com/rafaymemon01" target="_blank" color={'blue.500'} fontSize={14}>Rafay Memon</Link>
      </Box>
    </VStack>
  );
};

export default SuggestionsBox;
