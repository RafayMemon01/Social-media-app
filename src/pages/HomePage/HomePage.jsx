import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'

const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10} border={"1px solid blue"}>
          Feed Box
        </Box>
        <Box maxWidth={"300px"} flex={3} mr={20} display={{base:"none", lg:"block"}} border={"1px solid red"}>

          Suggestions Box
        </Box>


      </Flex>
    </Container>
  )}
export default HomePage