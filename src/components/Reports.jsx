import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Icon,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  InputGroup,
  InputLeftElement,
  Divider,
} from '@chakra-ui/react';
import { FiFileText, FiDollarSign, FiTrash2, FiSend, FiMessageSquare } from 'react-icons/fi';

export default function Reports() {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate a form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted",
        description: "Great shift! You are all set to clock out.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top", // Pops up at the top for immediate visibility
      });
      // In a real app, you would clear the form state here
    }, 1200);
  };

  return (
    <Box maxW="800px" mx="auto">
      {/* Page Header */}
      <Flex align="center" mb={6}>
        <Icon as={FiFileText} color="brand.500" boxSize={6} mr={3} />
        <Text fontSize="2xl" fontWeight="bold" color="brand.900">
          End of Shift Report
        </Text>
      </Flex>

      {/* Form Card */}
      <Box as="form" onSubmit={handleSubmit} bg="surface.white" p={{ base: 5, md: 8 }} borderRadius="xl" shadow="sm">
        <VStack spacing={6} align="stretch">
          
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="brand.900" mb={1}>Daily Log</Text>
            <Text fontSize="sm" color="gray.500">Please complete all fields accurately before clocking out.</Text>
          </Box>
          
          <Divider borderColor="gray.100" />

          {/* Side-by-side inputs on Desktop, Stacked on Mobile */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel fontWeight="medium" color="gray.700">Shift Type</FormLabel>
              <Select size="lg" placeholder="Select shift..." focusBorderColor="brand.500">
                <option value="morning_foh">Morning FOH</option>
                <option value="evening_foh">Evening FOH</option>
                <option value="morning_boh">Morning Kitchen</option>
                <option value="evening_boh">Evening Kitchen</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight="medium" color="gray.700">Food Waste (kg)</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiTrash2} color="gray.400" />
                </InputLeftElement>
                <Input type="number" placeholder="0.00" focusBorderColor="brand.500" />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontWeight="medium" color="gray.700">Cash Till Total</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiDollarSign} color="gray.400" />
                </InputLeftElement>
                <Input type="number" placeholder="0.00" focusBorderColor="brand.500" />
              </InputGroup>
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel fontWeight="medium" color="gray.700">Shift Notes / Incidents</FormLabel>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none" top="2">
                <Icon as={FiMessageSquare} color="gray.400" />
              </InputLeftElement>
              <Textarea 
                placeholder="Any 86'd items, VIP notes, or equipment issues?" 
                pl="2.5rem" // Adds padding so text doesn't overlap the icon
                minH="120px"
                focusBorderColor="brand.500"
              />
            </InputGroup>
          </FormControl>

          {/* Submission Button */}
          <Button
            type="submit"
            size="lg"
            h="16"
            w="full"
            bg="brand.500"
            color="white"
            fontSize="lg"
            isLoading={isSubmitting}
            loadingText="Submitting..."
            rightIcon={<FiSend />}
            _hover={{ bg: "brand.600", transform: "translateY(-2px)", shadow: "md" }}
            transition="all 0.2s"
            mt={4}
          >
            Submit Report
          </Button>

        </VStack>
      </Box>
    </Box>
  );
}