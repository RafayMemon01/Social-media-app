
import { useEffect, useState } from 'react'
import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import FeedPost from '../FeedPost/FeedPost'

const FeedBox = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
  }, [])
  return (

      <Container maxWidth={'container.sm'} py={10} px={2}>
          {isLoading && [0,1,2,3].map((_,idx)=>(
            <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
              <Flex gap={2}>
                <SkeletonCircle />
                <VStack gap={2} alignItems={'flex-start'}>
                  <Skeleton height={'10px'} width={'200px'}/>
                  <Skeleton height={'10px'} width={'200px'}/>
                </VStack>
                </Flex> 
                <Skeleton w={'full'}>
                  <Box height={'500px'}>content wrapped</Box>
                </Skeleton>
            </VStack>
          ))}

          {!isLoading && (<><FeedPost img={'/img1.png'} avatar={'img1.png'} username={'user1'}/>
        <FeedPost img={'/img2.png'} avatar={'img2.png'} username={'user1'}/>
        <FeedPost img={'/img3.png'} avatar={'img3.png'} username={'user1'}/>
        <FeedPost img={'/img4.png'} avatar={'img4.png'} username={'user1'}/></>)}


        
        
      </Container>
    )

  
}

export default FeedBox;
