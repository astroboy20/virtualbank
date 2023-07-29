import React, { useState } from "react";
import {
  
  Spinner,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Your actual login logic should go here
      router.push("/dashboard"); // Redirect to Dashboard after successful login
    }, 2000);
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor="#F0F2F5"
      onSubmit={handleSubmit}
    >
      <Box
        width="400px"
        backgroundColor="#FFFFFF"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Box padding="2rem" textAlign="center">
          <Box fontSize="2rem" fontWeight="bold" color="#007BFF">
            Your Bank Name
          </Box>
        </Box>
        <Box padding="2rem">
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
          <Button
            backgroundColor="#007BFF"
            color="#FFFFFF"
            marginBottom="1rem"
            _hover={{ backgroundColor: "#0056b3" }}
            _active={{ backgroundColor: "#004080" }}
            _focus={{ boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)" }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner size="1rem" color="#FFFFFF" marginRight="0.5rem" />
            ) : null}
            {isLoading ? "Logging In..." : "Log In"}
          </Button>
          <Box color="#666666" fontSize="0.9rem">
            Forgot password?{" "}
            <Box as="span" color="#007BFF" fontWeight="bold" cursor="pointer">
              Reset Password
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
