import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../../assets/contants";
import usePostComment from "../../../hooks/usePostComment";
import useAuthStore from "../../../store/authstore";
import useLikePost from "../../../hooks/useLikePost";
import CommentsModal from "../../Comment/CommentsModal";

const PostFooter = ({ post, username, isProfilePage, creatorProfile }) => {
  const [comment, setComment] = useState("");
  const { handlePostComment, isCommenting } = usePostComment();
  const {isOpen,onClose, onOpen}= useDisclosure()
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
    // eslint-disable-next-line no-console
  };
  const commentRef = useRef(null);
  const authUser = useAuthStore((state) => state.user);

  const { handleLikePost, isLiked, isLoading, likes } = useLikePost(post);

  // eslint-disable-next-line no-console
  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"2"}>
        <Box  cursor={"pointer"} onClick={handleLikePost}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box
          cursor={"pointer"}
          onClick={() => {
            commentRef.current.focus();
          }}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {creatorProfile?.userName}
            <Text as={"span"} fontWeight={400}>
              {" -- "}{post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 &&(

            <Text color={"gray"} fontSize={"sm"} cursor={'pointer'} onClick={onOpen}>
            View all {post.comments.length} comments
          </Text>)
          }
          {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
        </>
      )}

      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder="Add a comment..."
              fontSize="14"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={"14"}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
