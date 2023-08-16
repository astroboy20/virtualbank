// pages/dashboard.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
const transactions = [
  {
    id: 1,
    status: "pending",
    description: "Money-Deposit",
    amount: "280,000.00",
  },
  {
    id: 2,
    status: "success",
    description: "Pharmacy Supplier",
    amount: "20.45",
  },
  { id: 3, status: "03/26/22", description: "Coffee Shop", amount: "24.00" },
  {
    id: 4,
    status: "03/15/22",
    description: "Resturant Warehouse",
    amount: "20.75",
  },
];

const Dashboard = () => {
  const availableBalance = "1,000,000.23";
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
          const textWithoutNumbers = uName.replace(/\d+/g, "");
          const text = textWithoutNumbers;
          setDisplayName(text);
        } 
        else {
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
    <>
      <Box
        backgroundColor="#005288"
        padding="2rem"
        color="#FFFFFF"
        mb={{ _: "-100px", md: "-200px" }}
        height={"250px"}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box as="h2" fontSize={{ _: "1.5rem", md: "2rem" }}>
            <Image
              src={"/logo-white.png"}
              width={100}
              height={100}
              alt="logo"
            />
          </Box>
          <Button border={"none"} padding={"10px"} onClick={handleLogout} cursor={"pointer"}>
            <BiLogOut size={"20px"} />
          </Button>
        </Box>
        <Box fontSize={"20px"} margin={" 10px auto"}>
          WELCOME {displayName}
        </Box>
      </Box>
      <Box
        position="absolute"
        width="100%"
        padding="2rem"
        backgroundColor="#F0F2F5"
        minHeight="100vh"
        top={{ _: "80px", md: "180px" }}
      >
        <Box>
          <Accordion
            fontSize={{ _: "3rem", md: "1.5rem" }}
            color="#007BFF"
            fontWeight="bold"
            textAlign="center"
            mb="1rem"
            alignItems={"center"}
            marginTop="1rem"
            padding="2rem 1rem"
            backgroundColor="#FFFFFF"
            borderRadius="8px"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            border={"none"}
            allowToggle
          >
            <AccordionItem>
              <h2>
                <AccordionButton
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"left"}
                  background="none"
                  border={"none"}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"10px"}
                    fontWeight={"bold"}
                  >
                    <span style={{ fontSize: "20px" }}>
                      INITIATE BUSINESS CHECKING <sup>TM ...7891</sup>{" "}
                    </span>
                    <span style={{ fontSize: "25px" }}>
                      ${availableBalance}
                    </span>
                    <span style={{ fontSize: "10px" }}>Available Balance</span>

                    <br />
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box>
                  {transactions.map((transaction) => (
                    <Box
                      key={transaction.id}
                      display="flex"
                      justifyContent="space-between"
                      borderBottom="1px solid #E0E0E0"
                      padding="0.5rem 0"
                      fontSize={{ _: "10px", md: "16px" }}
                      color={"black"}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        textAlign={"left"}
                        gap={"10px"}
                      >
                        {transaction.amount >= "280,000.00" ? (
                          <AiOutlineClockCircle />
                        ) : (
                          <IoIosCheckmarkCircleOutline />
                        )}
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"5px"}
                        >
                          <Box fontWeight={"200"}>{transaction.status}</Box>
                          {transaction.description}
                        </Box>
                      </Box>
                      <Box>
                        {transaction.amount < 0 ? "" : ""}${transaction.amount}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <Box
          fontSize={{ _: "3rem", md: "1.5rem" }}
          // color="#007BFF"
          fontWeight="bold"
          textAlign="center"
          mb="1rem"
          alignItems={"center"}
          marginTop="1rem"
          padding="2rem 1rem"
          backgroundColor="#FFFFFF"
          borderRadius="8px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          border={"none"}
        >
          <Box
            as="span"
            flex="1"
            textAlign="left"
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
          >
            <span style={{ fontSize: "20px" }}>
              BUSINESS MARKET RATE SAVINGS <sup>...7654</sup>{" "}
            </span>
            <span style={{ fontSize: "25px" }}>$35,250.16</span>
            <span style={{ fontSize: "10px" }}>Available Balance</span>

            <br />
          </Box>
        </Box>
        <Box
          fontSize={{ _: "3rem", md: "1.5rem" }}
          // color="#007BFF"
          fontWeight="bold"
          textAlign="center"
          mb="1rem"
          alignItems={"center"}
          marginTop="1rem"
          padding="2rem 1rem"
          backgroundColor="#FFFFFF"
          borderRadius="8px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          border={"none"}
        >
          <Box
            as="span"
            flex="1"
            textAlign="left"
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
          >
            <span style={{ fontSize: "20px" }}>
              BUSINESS CREDIT CARD<sup>...7893</sup>{" "}
            </span>
            <span style={{ fontSize: "25px" }}>$5,432.89</span>
            <span style={{ fontSize: "10px" }}>Outstanding Balance</span>

            <br />
          </Box>
        </Box>
        <Box
          fontSize={{ _: "3rem", md: "1.5rem" }}
          // color="#007BFF"
          fontWeight="bold"
          textAlign="center"
          mb="1rem"
          alignItems={"center"}
          marginTop="1rem"
          padding="2rem 1rem"
          backgroundColor="#FFFFFF"
          borderRadius="8px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          border={"none"}
        >
          <Box
            as="span"
            flex="1"
            textAlign="left"
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
          >
            <span style={{ fontSize: "20px" }}>
              BUSINESS LINE OF CREDIT<sup>...1972</sup>{" "}
            </span>
            <span style={{ fontSize: "25px" }}>$3,500</span>
            <span style={{ fontSize: "10px" }}>Available Balance</span>

            <br />
          </Box>
        </Box>
        
      </Box>
    </>
  );
};

export default Dashboard;
