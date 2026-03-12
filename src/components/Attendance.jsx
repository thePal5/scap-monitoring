import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Flex,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  useToast,
  Divider
} from '@chakra-ui/react';
import { FiClock, FiCalendar, FiTrendingUp, FiCoffee, FiCheckCircle } from 'react-icons/fi';

const attendanceData = [
  { id: 1, date: 'Mar 12, 2026', shift: 'Morning FOH', in: '07:55 AM', out: '04:05 PM', hours: '8.1', status: 'On Time' },
  { id: 2, date: 'Mar 11, 2026', shift: 'Morning FOH', in: '08:15 AM', out: '04:30 PM', hours: '8.2', status: 'Late' },
  { id: 3, date: 'Mar 10, 2026', shift: 'Morning FOH', in: '07:50 AM', out: '--:-- PM', hours: 'N/A', status: 'Missed Punch' },
  { id: 4, date: 'Mar 09, 2026', shift: 'Morning FOH', in: '07:58 AM', out: '04:00 PM', hours: '8.0', status: 'On Time' },
];

const SummaryCard = ({ title, value, icon, color }) => (
  <Box p={5} bg="surface.white" borderRadius="xl" shadow="sm">
    <Flex align="center" justify="space-between">
      <VStack align="start" spacing={1}>
        <Text fontSize="sm" fontWeight="bold" color="gray.500">{title}</Text>
        <Text fontSize="2xl" fontWeight="black" color="brand.900">{value}</Text>
      </VStack>
      <Box p={3} bg={`${color}.50`} borderRadius="lg">
        <Icon as={icon} boxSize={6} color={`${color}.500`} />
      </Box>
    </Flex>
  </Box>
);

export default function Attendance() {
  const [clockStatus, setClockStatus] = useState('logged_out'); // 'logged_out', 'clocked_in', 'on_break'
  const [currentTime, setCurrentTime] = useState(new Date());
  const toast = useToast();

  // Live clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Time': return <Badge colorScheme="green" px={2} py={1} borderRadius="md">On Time</Badge>;
      case 'Late': return <Badge colorScheme="red" px={2} py={1} borderRadius="md">Late</Badge>;
      case 'Missed Punch': return <Badge colorScheme="orange" px={2} py={1} borderRadius="md">Missed Punch</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const handleClockToggle = () => {
    const newStatus = clockStatus === 'logged_out' ? 'clocked_in' : 'logged_out';
    setClockStatus(newStatus);
    
    toast({
      title: newStatus === 'clocked_in' ? "Clocked In Successfully" : "Clocked Out Successfully",
      description: `Time logged at ${currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
      status: newStatus === 'clocked_in' ? "success" : "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleBreakToggle = () => {
    const newStatus = clockStatus === 'clocked_in' ? 'on_break' : 'clocked_in';
    setClockStatus(newStatus);
    
    toast({
      title: newStatus === 'on_break' ? "Break Started" : "Break Ended",
      description: "Enjoy your break!" ,
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box maxW="1000px" mx="auto">
      <Flex align="center" mb={6}>
        <Icon as={FiClock} color="brand.500" boxSize={6} mr={3} />
        <Text fontSize="2xl" fontWeight="bold" color="brand.900">Time Clock & Attendance</Text>
      </Flex>

      {/* NEW: Live Time Clock Action Bar */}
      <Box p={{ base: 5, md: 8 }} bg="surface.white" borderRadius="xl" shadow="sm" mb={8} borderTop="4px solid" borderColor="brand.500">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={6}>
          
          {/* Live Clock Display */}
          <VStack align={{ base: "center", md: "flex-start" }} spacing={1}>
            <Text fontSize="sm" fontWeight="bold" color="gray.500 textTransform='uppercase'">
              {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
            <Text fontSize={{ base: "4xl", md: "5xl" }} fontWeight="black" color="brand.900" lineHeight="1" fontFamily="monospace">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </Text>
            <HStack mt={2}>
              <Box w={3} h={3} borderRadius="full" bg={
                clockStatus === 'clocked_in' ? 'green.400' : 
                clockStatus === 'on_break' ? 'orange.400' : 'gray.300'
              } />
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                Status: {clockStatus === 'clocked_in' ? 'Clocked In' : clockStatus === 'on_break' ? 'On Break' : 'Off the Clock'}
              </Text>
            </HStack>
          </VStack>

          {/* Action Buttons */}
          <VStack w={{ base: "full", md: "auto" }} spacing={3}>
            <Button
              size="lg"
              w={{ base: "full", md: "250px" }}
              h="16"
              fontSize="lg"
              colorScheme={clockStatus === 'logged_out' ? "blue" : "red"}
              bg={clockStatus === 'logged_out' ? "brand.500" : "red.500"}
              onClick={handleClockToggle}
              isDisabled={clockStatus === 'on_break'}
              leftIcon={<Icon as={clockStatus === 'logged_out' ? FiCheckCircle : FiClock} />}
              _hover={{ transform: "translateY(-2px)", shadow: "md" }}
              transition="all 0.2s"
            >
              {clockStatus === 'logged_out' ? "PUNCH IN" : "PUNCH OUT"}
            </Button>

            <Button
              size="md"
              w={{ base: "full", md: "250px" }}
              variant={clockStatus === 'logged_out' ? "ghost" : "outline"}
              colorScheme="orange"
              onClick={handleBreakToggle}
              isDisabled={clockStatus === 'logged_out'}
              leftIcon={<FiCoffee />}
            >
              {clockStatus === 'on_break' ? "END MEAL BREAK" : "START MEAL BREAK"}
            </Button>
          </VStack>

        </Flex>
      </Box>

      {/* Summary Widgets */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <SummaryCard title="Current Pay Period" value="33.3 hrs" icon={FiCalendar} color="brand" />
        <SummaryCard title="Shifts Completed" value="5" icon={FiTrendingUp} color="green" />
        <SummaryCard title="Missed Punches" value="1" icon={FiClock} color="orange" />
      </SimpleGrid>

      {/* Data Table */}
      <Box bg="surface.white" borderRadius="xl" shadow="sm" overflow="hidden">
        <Box p={5} borderBottom="1px solid" borderColor="gray.100">
          <Text fontSize="lg" fontWeight="bold" color="brand.900">Recent Shifts</Text>
        </Box>
        
        <TableContainer>
          <Table variant="simple" colorScheme="gray">
            <Thead bg="gray.50">
              <Tr>
                <Th>Date</Th>
                <Th>Shift</Th>
                <Th>Punch In</Th>
                <Th>Punch Out</Th>
                <Th isNumeric>Hours</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {attendanceData.map((row) => (
                <Tr key={row.id} _hover={{ bg: 'gray.50' }}>
                  <Td fontWeight="medium" color="gray.800">{row.date}</Td>
                  <Td color="gray.600">{row.shift}</Td>
                  <Td fontWeight="bold" color="brand.900">{row.in}</Td>
                  <Td fontWeight="bold" color="brand.900">{row.out}</Td>
                  <Td isNumeric color="gray.600">{row.hours}</Td>
                  <Td>{getStatusBadge(row.status)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}