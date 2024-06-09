import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <>
      <Flex
        minHeight={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
      >
        <Container padding={0} maxWidth={"container.md"}>
            <Flex justifyContent={'center'} alignItems={'center'} gap={10}>

          <Box display={{ base: "none", md: "block" }}>
            <Image  draggable={false} src="/auth.png" alt="auth" height={650} />
          </Box>
          <VStack align={'stretch'} spacing={4}>
            <AuthForm />
            <Box textAlign={"center"}>Get The App.</Box>
            <Flex justifyContent={"center"} gap={4}>
                <Image  draggable={false} src="/microsoft.png" h={10} alt="microsoft" />
                <Image draggable={false} src="/playstore.png" h={10} alt="playstore" />
            </Flex>
          </VStack>
            </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default AuthPage;
