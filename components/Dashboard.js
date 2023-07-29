// pages/dashboard.js
import React from 'react';
import { Box, Button }  from "@chakra-ui/react";;

const transactions = [
  { id: 1, description: 'Coffee', amount: -3.5 },
  { id: 2, description: 'Salary', amount: 2000 },
  { id: 3, description: 'Groceries', amount: -50.75 },
  // Add more dummy transactions as needed
];

const Dashboard = () => {
  const availableBalance = 2145.25; // Replace this with your actual balance logic

  const handleLogout = () => {
    // Your logout logic goes here
    console.log('User logged out');
  };

  return (
    <Box padding="2rem" backgroundColor="#F7F7F7" minHeight="100vh">
      <Box backgroundColor="#007BFF" padding="1rem" color="#FFFFFF" textAlign="center">
        <h2>Dashboard</h2>
      </Box>
      <Box marginTop="1rem" padding="1rem" backgroundColor="#FFFFFF" borderRadius="8px" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)">
        <h3>Available Balance: ${availableBalance}</h3>
        <Button backgroundColor="#18A558" color="#FFFFFF" marginTop="1rem" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
      <Box marginTop="1rem">
        <h3>Transaction History</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description}: {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Dashboard;
