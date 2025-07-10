import { Text, VStack, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages';

function App() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("wedding_username");
    if (saved) {
      setUsername(saved);
      navigate("/wedding-book-fe")
    } else {
      setUsername("")
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
      {/* <Image
        w="80%"
        src={logo}
      /> */}
      <Text
        fontSize="5xl"
      >
        Wedding Book
      </Text>
      <Routes>
        <Route path="/wedding-book-fe/login" element={<Login setUsername={setUsername} username={username} />} />
        <Route path='/wedding-book-fe/' element={<Home username={username} />} />
      </Routes>
    </VStack >
  )
}

export default App
