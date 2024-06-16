import { Box, Container, Image } from '@chakra-ui/react'
import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'

const FeedPost = ({img,avatar,username}) => {
  return (
    <>
      <PostHeader avatar={avatar} username={username}/>
      <Box my={4} borderRadius={4} overflow={'hidden'}>
        <Image src={img} />
      </Box>
      <PostFooter username={username} />
    </>
  )
}

export default FeedPost
