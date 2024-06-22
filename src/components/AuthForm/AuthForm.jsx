import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
          <Input
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            placeholder="Email"
            type="email"
            fontSize={14}
          />
          <Input
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            minLength={6}
            placeholder="Password"
            type="password"
            fontSize={14}
          />
          {!isLogin ? (
            <Input
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              minLength={6}
              placeholder="Password"
              type="password"
              fontSize={14}
            />
          ) : null}
          <Button
            width={"full"}
            colorScheme="blue"
            size={"sm"}
            fontSize={14}
          >
            {isLogin ? "Log in" : "Sign Up"}
          </Button>

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

          <Flex alignItems={"center"} cursor={"pointer"}>
            <Image
              draggable={false}
              src="/google.png"
              w={5}
              alt="Google Logo"
            />
            <Text color={"blue.500"} mx={2}>
              Login in with Google
            </Text>
          </Flex>
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
