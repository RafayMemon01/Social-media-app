import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import useFollowUser from "../../../hooks/useFollowUser";

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowings, isUpdating } = useFollowUser(
    post.createdBy
  );
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={{base: "start", md: "center"}}
      flexDir={{base: "column", md: "row"}}
      w={"full"}
      my={3}
    >
      <Flex alignItems={"center"}  gap={2}>
        <Link to={`/${creatorProfile?.userName}`}>
          <Avatar
            src={creatorProfile?.profilePicURL}
            alt={creatorProfile?.userName}
            size={"sm"}
          />
        </Link>
        <Flex flexDir={{base: "column", md: "row"}} fontSize={12} fontWeight={"bold"} gap={{base:0,md:"2"}}>
          <Link to={`/${creatorProfile?.userName}`}>
            {creatorProfile?.userName}
          </Link>
          <Box color={"gray.500"}>{formatDate(post.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          background={"transparent"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
          color={"blue.500"}
          fontSize={12}
          fontWeight={"bold"}
          _hover={{
            color: "white",
          }}
          transition={".2s ease-in-out"}
        >
          {isFollowings ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
