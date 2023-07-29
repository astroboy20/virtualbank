import React from "react";
import {
  Center,
  FormControl,
  FormLabel,
  Spinner,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [details, setDetails] = useState("");
  const router =useRouter()
  const handleSubmit = (e) => {
    e.preventDefault();
    setDetails(`${email} : ${password}`);
    setEmail("");
    setPassword("");
    router.push("./dashboard")

  };
  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            backgroundColor="#007BFF"
          >
            <Box
              padding="2rem"
              backgroundColor="#FFFFFF"
              borderRadius="8px"
              boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            >
              <Input
                type="email"
                placeholder="Email"
                marginBottom="1rem"
                borderRadius={10}
                padding="10px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                marginBottom="1rem"
                borderRadius={10}
                padding="10px"
                width="auto"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button backgroundColor="#18A558" color="#FFFFFF" width={100}>
                Log In
              </Button>
            </Box>
          </Box>
        </form>

        <div>{details}</div>
      </Box>
    </div>
  );
};

export default Login;
