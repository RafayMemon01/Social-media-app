import { Container } from '@chakra-ui/react'
import FeedPost from '../FeedPost/FeedPost'

const FeedBox = () => {
  return (

      <Container maxWidth={'container.sm'} py={10} px={2}>

        <FeedPost/>
        <FeedPost/>
        <FeedPost/>
      </Container>
    )

  
}

export default FeedBox;
