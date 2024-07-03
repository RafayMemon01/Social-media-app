import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image
            draggable={false}
            src="/logo.png"
            height={24}
            cursor={"pointer"}
            alt="Instagram"
          />
          {isLogin ? <Login /> : <SignUp />}

          {/* Or Text */}
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
            my={4}
            gap={1}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
            OR
            <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
          </Flex>

          <GoogleAuth prefix={isLogin?"Log in":"Sign up"} />
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box mx={2} fontFamily={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            color={"blue.500"}
            cursor={"pointer"}
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Sign Up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
