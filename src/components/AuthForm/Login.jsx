import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <Input
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        placeholder="Email"
        size={'sm'}

        type="email"
        fontSize={14}
      />
      <Input
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        minLength={6}
        size={'sm'}

        placeholder="Password"
        type="password"
        fontSize={14}
      />

      <Button width={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
        {"Log in"}
      </Button>
    </>
  );
};

export default Login;
