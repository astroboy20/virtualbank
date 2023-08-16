import React, { useState, useEffect } from "react";
import { Spinner, Input, Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(" ")
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        router.push("/dashboard");
        typeof window !== "undefined" &&
          localStorage.setItem("name", user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false);
        setIsError(error.message)
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
      }
    });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor="#F0F2F5"
      padding={{ _: "2rem", md: "4rem" }}
    >
      <Box
        width={{ _: "80%", md: "400px" }}
        backgroundColor="#FFFFFF"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        padding="2rem"
      >
        <Box textAlign="center">
          <Image src={"/logo.png"} width={300} height={300} alt="logo"/>
        </Box>
        <Box background={"red"} color={"#fff"} padding={"10px"}> 
        {isError}
        </Box>
        
        <Box display={"flex"} flexDirection={"column"} padding="2rem">
          <Input
            type="email"
            placeholder="Email"
            marginBottom="1rem"
            borderRadius={10}
            padding="10px"
            border="1px solid black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            marginBottom="1rem"
            borderRadius={10}
            border="1px solid black"
            padding="10px"
            width="auto"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            backgroundColor="#005288"
            color="#FFFFFF"
            marginBottom="1rem"
            type="submit"
            size={"lg"}
            padding={"10px"}
            borderRadius={"10px"}
            border={"none"}
            _hover={{ backgroundColor: "#0056b3" }}
            _active={{ backgroundColor: "#004080" }}
            _focus={{ boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner size="1rem" color="#FFFFFF" marginRight="0.5rem" />
            ) : null}
            {isLoading ? "Logging In..." : "Log In"}
          </Button>
          <Box color="#666666" fontSize="0.9rem">
            {/* Forgot password?{" "} */}
            <Box as="span" color="#007BFF" fontWeight="bold" cursor="pointer">
              {/* Reset Password */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
