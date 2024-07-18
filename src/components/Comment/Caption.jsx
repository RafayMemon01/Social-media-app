import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, Flex,Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import userProfileStore from "../../store/userProfileStore";

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};
const Caption = ({post}) => {
  const userProfile = userProfileStore((state) => state.userProfile);
  return (
    <Flex gap={4}>
      <Link to={`/${userProfile?.userName}`}>
        <Avatar
          src={userProfile?.profilePicURL}
          name={userProfile?.userName}
          size={"sm"}
        />
      </Link>
      <Flex direction="column">
        <Flex gap={2}>
          <Link to={`/${userProfile?.userName}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile?.userName}
            </Text>
          </Link>
          <Text fontSize={14}>{post.caption}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {formatDate(post?.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Caption;
