import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const {loading, error, login} = useLogin()

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
      {error&&(
        <Alert status="error" fontSize={12} p={2} borderRadius={4}>
            <AlertIcon fontSize={11}/>
            Some things went wrong!
        </Alert>
        )}

      <Button width={"full"} onClick={()=>{login(inputs)}} isLoading={loading} colorScheme="blue" size={"sm"} fontSize={14}>
        {"Log in"}
      </Button>
    </>
  );
};

export default Login;
