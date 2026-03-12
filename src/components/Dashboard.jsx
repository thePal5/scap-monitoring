import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  VStack,
  HStack,
  Badge,
  Icon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
} from '@chakra-ui/react';
import { 
  FiClock, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiCoffee, 
  FiCalendar, 
  FiBarChart2 
} from 'react-icons/fi';

export default function Dashboard() {
  // Enhanced state for timesheet functionality
  const [clockStatus, setClockStatus] = useState('logged_out'); // 'logged_out', 'clocked_in', 'on_break'

  const toggleClock = () => {
    if (clockStatus === 'logged_out') setClockStatus('clocked_in');
    else setClockStatus('logged_out');
  };

  const toggleBreak = () => {
    if (clockStatus === 'clocked_in') setClockStatus('on_break');
    else if (clockStatus === 'on_break') setClockStatus('clocked_in');
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" color="brand.900" mb={6}>
        Shift Overview
      </Text>

      {/* Top Row: High Priority Actions & Summaries */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        
        {/* Widget 1: Enhanced Time Clock & Break Tracker */}
        <Box p={6} bg="surface.white" borderRadius="xl" shadow="sm">
          <VStack spacing={5} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold" color="gray.600">Time Clock & Breaks</Text>
              <Icon as={FiClock} color="brand.500" boxSize={5} />
            </Flex>
            
            <Flex align="center" justify="center" p={3} bg="gray.50" borderRadius="lg">
              <Text fontSize="md" fontWeight="medium" color={
                clockStatus === 'clocked_in' ? 'green.500' : 
                clockStatus === 'on_break' ? 'orange.500' : 'gray.500'
              }>
                {clockStatus === 'clocked_in' ? "🟢 You are currently clocked in." : 
                 clockStatus === 'on_break' ? "☕ You are on a meal break." : 
                 "⚪ You are not clocked in."}
              </Text>
            </Flex>

            <SimpleGrid columns={2} spacing={4}>
              <Button
                size="md"
                h="14"
                colorScheme={clockStatus === 'logged_out' ? "blue" : "red"}
                bg={clockStatus === 'logged_out' ? "brand.500" : "red.500"}
                onClick={toggleClock}
                isDisabled={clockStatus === 'on_break'} // Prevent clock out while on break
                _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                transition="all 0.2s"
              >
                {clockStatus === 'logged_out' ? "CLOCK IN" : "CLOCK OUT"}
              </Button>

              <Button
                size="md"
                h="14"
                variant={clockStatus === 'logged_out' ? "outline" : "solid"}
                colorScheme="orange"
                bg={clockStatus === 'on_break' ? "orange.400" : clockStatus === 'clocked_in' ? "orange.100" : "transparent"}
                color={clockStatus === 'clocked_in' ? "orange.700" : clockStatus === 'on_break' ? "white" : "gray.400"}
                onClick={toggleBreak}
                isDisabled={clockStatus === 'logged_out'}
                leftIcon={<FiCoffee />}
                _hover={clockStatus !== 'logged_out' ? { transform: "translateY(-2px)", shadow: "md" } : {}}
                transition="all 0.2s"
              >
                {clockStatus === 'on_break' ? "END BREAK" : "START BREAK"}
              </Button>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* Widget 2: Timesheet & Weekly Hours Summary */}
        <Box p={6} bg="surface.white" borderRadius="xl" shadow="sm">
          <VStack spacing={4} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold" color="gray.600">Weekly Timesheet</Text>
              <Icon as={FiBarChart2} color="brand.500" boxSize={5} />
            </Flex>

            <StatGroup>
              <Stat>
                <StatLabel color="gray.500">Hours Worked</StatLabel>
                <StatNumber color="brand.900" fontSize="3xl">28.5</StatNumber>
              </Stat>
              <Stat>
                <StatLabel color="gray.500">Scheduled</StatLabel>
                <StatNumber color="gray.700" fontSize="3xl">36.0</StatNumber>
              </Stat>
              <Stat>
                <StatLabel color="gray.500">Overtime</StatLabel>
                <StatNumber color={0 > 2 ? "red.500" : "green.500"} fontSize="3xl">0.0</StatNumber>
              </Stat>
            </StatGroup>

            <Box>
              <Flex justify="space-between" mb={1}>
                <Text fontSize="xs" fontWeight="bold" color="gray.500">Weekly Progress</Text>
                <Text fontSize="xs" fontWeight="bold" color="brand.500">79%</Text>
              </Flex>
              <Progress value={79} size="sm" colorScheme="brand" borderRadius="full" />
            </Box>
          </VStack>
        </Box>

      </SimpleGrid>

      {/* Bottom Row: Tasks, Schedule, Notices */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        
        {/* Widget 3: Upcoming Schedule */}
        <Box p={6} bg="surface.white" borderRadius="xl" shadow="sm">
          <VStack spacing={4} align="flex-start">
            <Flex w="full" justify="space-between" align="center">
              <Text fontWeight="bold" color="gray.600">Upcoming Shifts</Text>
              <Icon as={FiCalendar} color="brand.500" boxSize={5} />
            </Flex>

            <VStack w="full" align="stretch" spacing={0} divider={<Divider borderColor="gray.100" />}>
              <Flex justify="space-between" py={2}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="bold" color="brand.900">Tomorrow</Text>
                  <Text fontSize="xs" color="gray.500">Mar 13, 2026</Text>
                </VStack>
                <Text fontSize="sm" fontWeight="medium" color="gray.700">08:00 AM - 04:00 PM</Text>
              </Flex>
              <Flex justify="space-between" py={2}>
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">Saturday</Text>
                  <Text fontSize="xs" color="gray.500">Mar 14, 2026</Text>
                </VStack>
                <Text fontSize="sm" fontWeight="medium" color="gray.700">12:00 PM - 08:00 PM</Text>
              </Flex>
            </VStack>
          </VStack>
        </Box>

        {/* Widget 4: Daily Prep List (Gamified) */}
        <Box p={6} bg="surface.white" borderRadius="xl" shadow="sm">
          <VStack spacing={4}>
            <Flex w="full" justify="space-between" align="center">
              <Text fontWeight="bold" color="gray.600">Daily Tasks</Text>
              <Icon as={FiCheckCircle} color="brand.500" boxSize={5} />
            </Flex>
            <CircularProgress value={65} color="brand.500" size="100px" thickness="12px">
              <CircularProgressLabel fontWeight="bold" fontSize="lg" color="brand.900">
                65%
              </CircularProgressLabel>
            </CircularProgress>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              14 of 22 tasks completed.
            </Text>
          </VStack>
        </Box>

        {/* Widget 5: Shift Notices */}
        <Box p={6} bg="surface.white" borderRadius="xl" shadow="sm">
          <VStack spacing={4} align="flex-start">
            <Flex w="full" justify="space-between" align="center">
              <Text fontWeight="bold" color="gray.600">Shift Notices</Text>
              <Icon as={FiAlertCircle} color="brand.500" boxSize={5} />
            </Flex>

            <VStack w="full" align="stretch" spacing={3}>
              <HStack p={3} bg="red.50" borderRadius="md" borderLeft="4px solid" borderColor="red.400">
                <Badge colorScheme="red">86'd</Badge>
                <Text fontSize="xs" fontWeight="medium">Avocados are out of stock.</Text>
              </HStack>
              <HStack p={3} bg="brand.50" borderRadius="md" borderLeft="4px solid" borderColor="brand.500">
                <Badge colorScheme="blue">VIP</Badge>
                <Text fontSize="xs" fontWeight="medium">Party of 12 arriving at 7 PM.</Text>
              </HStack>
            </VStack>
          </VStack>
        </Box>

      </SimpleGrid>
    </Box>
  );
}