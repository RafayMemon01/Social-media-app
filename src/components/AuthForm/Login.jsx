import { Input } from "@chakra-ui/react"

const Login = () => {
  return (
    <>
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
    </>
  )
}

export default Login
