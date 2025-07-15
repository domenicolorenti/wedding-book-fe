import { Text, VStack, Grid, Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages';

export const UserContext = React.createContext<string>("")

function App() {
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("wedding_username");
    if (saved) {
      setUser(saved);
      navigate("/wedding-book-fe")
    } else {
      setUser("")
      navigate("/wedding-book-fe/login")
    }
  }, []);

  return (
    <VStack
      bg="orange.50"
      py="8"
      color="gray.700"
      fontFamily="Serif"
      minH="100vh"
    >
      <UserContext value={user}>
        {/* <Image
        w="80%"
        src={logo}
      /> */}
        <Flex>
          Benvenuto/a <Text ml="1" fontWeight={'bold'}>{user}</Text>!
        </Flex>
        <Text
          fontSize="5xl"
        >
          Wedding Book
        </Text>
        <Routes>
          <Route path="/wedding-book-fe/login" element={<Login setUser={setUser} />} />
          <Route path='/wedding-book-fe/' element={<Home />} />
        </Routes>
      </UserContext>
    </VStack >
  )
}

export default App
