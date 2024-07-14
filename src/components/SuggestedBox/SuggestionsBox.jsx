import { Link, Box, Flex, Text, VStack, Spinner } from "@chakra-ui/react";
import React from "react";
import SuggestionHeader from "./SuggestionHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestionsBox = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  if (isLoading) return <PageLayoutSpinner />;
  return (
    <VStack py={8} gap={4}>
      <SuggestionHeader />

      {suggestedUsers.length !== 0 && (
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"full"}
        >
          {" "}
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
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser key={user.id} user={user} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        &copy; 2024 Built By {""}
        <Link
          href="https://github.com/rafaymemon01"
          target="_blank"
          color={"blue.500"}
          fontSize={14}
        >
          Rafay Memon
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestionsBox;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
      <Spinner size={"sm"} />
    </Flex>
  );
};
