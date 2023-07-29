// pages/dashboard.js
import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
const transactions = [
  { id: 1, description: "Coffee", amount: -3.5 },
  { id: 2, description: "Salary", amount: 20000 },
  { id: 3, description: "Groceries", amount: -50.75 },
];

const Dashboard = () => {
  const availableBalance = 214500.25;
  const router = useRouter();
  const handleLogout = () => {
    console.log("User logged out");

    signOut(auth)
      .then(() => {
        router.push("./");
      })
      .catch((error) => {});
  };

  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
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

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER);
      }
    });
  }, [displayName, dispatch]);
  return (
    <Box padding="2rem" backgroundColor="#F0F2F5" minHeight="100vh">
      <Box
        backgroundColor="#007BFF"
        padding="1rem"
        color="#FFFFFF"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box as="h2" fontSize={{ _: "1.5rem", md: "2rem" }}>
          Starlight Finance
        </Box>
        <Button
          backgroundColor="#18A558"
          color="#FFFFFF"
          border={"none"}
          padding={"10px"}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>

      <Box
        marginTop="1rem"
        padding="1rem"
        backgroundColor="#FFFFFF"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Box textAlign="left">Welcome back {displayName}</Box>
        <Box
          fontSize={{ _: "1.2rem", md: "1.5rem" }}
          color="#007BFF"
          fontWeight="bold"
          textAlign="center"
          mb="1rem"
          alignItems={"center"}
        >
          Available Balance: ${availableBalance.toFixed(2)}
        </Box>
        {/* <Box textAlign="center">
          <Button
            backgroundColor="#007BFF"
            color="#FFFFFF"
            marginRight="0.5rem"
          >
            Deposit
          </Button>
          <Button backgroundColor="#18A558" color="#FFFFFF" marginLeft="0.5rem">
            Withdraw
          </Button>
        </Box> */}
      </Box>
      <Box marginTop="1rem">
        <Box
          fontSize={{ _: "1.2rem", md: "1.5rem" }}
          color="#007BFF"
          fontWeight="bold"
          mb="1rem"
        >
          Transaction History
        </Box>
        <Box>
          {transactions.map((transaction) => (
            <Box
              key={transaction.id}
              display="flex"
              justifyContent="space-between"
              borderBottom="1px solid #E0E0E0"
              padding="0.5rem 0"
              fontSize={{ _: "0.9rem", md: "1rem" }}
              color={transaction.amount < 0 ? "#FF0000" : "#18A558"}
            >
              <Box>{transaction.description}</Box>
              <Box>
                {transaction.amount < 0 ? "-" : "+"}$
                {Math.abs(transaction.amount.toFixed(2))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
