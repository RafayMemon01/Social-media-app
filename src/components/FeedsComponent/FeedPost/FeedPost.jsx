import { Box, Container, Image } from '@chakra-ui/react'
import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'

const FeedPost = () => {
  return (
    <>
      <PostHeader/>
      <Box>
        <Image src='img1.png' />
      </Box>
      <PostFooter/>
    </>
  )
}

export default FeedPost
