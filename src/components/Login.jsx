import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Checkbox,
  Icon,
} from '@chakra-ui/react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate an API authentication call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Trigger the function passed from App.jsx to unlock the app
    }, 1000);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="surface.gray" p={4}>
      <Box 
        w="full" 
        maxW="md" 
        bg="surface.white" 
        p={8} 
        borderRadius="2xl" 
        shadow="lg"
      >
        <VStack spacing={8} align="stretch">
          
          {/* Header */}
          <VStack spacing={2} align="center" textAlign="center">
            <Box p={3} bg="brand.50" borderRadius="full" mb={2}>
              <Icon as={FiLogIn} boxSize={8} color="brand.500" />
            </Box>
            <Heading fontSize="2xl" color="brand.900">Welcome to SCAP</Heading>
            <Text color="gray.500" fontSize="sm">
              Enter your Employee ID to access your dashboard.
            </Text>
          </VStack>

          {/* Form */}
          <Box as="form" onSubmit={handleLogin}>
            <VStack spacing={5}>
              
              <FormControl isRequired>
                <FormLabel color="gray.700">Employee ID</FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiUser} color="gray.400" />
                  </InputLeftElement>
                  <Input 
                    type="text" 
                    placeholder="e.g. 1042" 
                    focusBorderColor="brand.500" 
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.700">PIN / Password</FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Enter password" 
                    focusBorderColor="brand.500" 
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={<Icon as={showPassword ? FiEyeOff : FiEye} color="gray.400" boxSize={5} />}
                      onClick={() => setShowPassword(!showPassword)}
                      _hover={{ bg: 'transparent', color: 'brand.500' }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Flex w="full" justify="space-between" align="center">
                <Checkbox colorScheme="brand" size="md">
                  <Text fontSize="sm" color="gray.600">Remember me</Text>
                </Checkbox>
                <Button variant="link" colorScheme="brand" size="sm">
                  Forgot PIN?
                </Button>
              </Flex>

              <Button
                type="submit"
                size="lg"
                w="full"
                h="14"
                bg="brand.500"
                color="white"
                fontSize="md"
                isLoading={isLoading}
                loadingText="Authenticating..."
                _hover={{ bg: 'brand.600', transform: 'translateY(-2px)', shadow: 'md' }}
                transition="all 0.2s"
                mt={4}
              >
                Sign In
              </Button>

            </VStack>
          </Box>
          
        </VStack>
      </Box>
    </Flex>
  );
}