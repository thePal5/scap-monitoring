import React, { useState } from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Checkbox, 
  Badge, 
  Flex, 
  Icon, 
  Divider, 
  IconButton, 
  Collapse, 
  Textarea, 
  Button,
  useToast
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckSquare, FiClock, FiMessageSquare, FiSend } from 'react-icons/fi';

const MotionBox = motion(Box);

// Added 'note' and 'showNote' to our state structure
const initialTasks = [
  { id: 1, text: 'Calibrate espresso machine', category: 'Morning Prep', time: '08:00 AM', completed: false, note: '', showNote: false },
  { id: 2, text: 'Check walk-in fridge temp', category: 'Safety', time: '08:30 AM', completed: false, note: '', showNote: false },
  { id: 3, text: 'Prep 5kg diced tomatoes', category: 'Kitchen', time: '09:00 AM', completed: false, note: '', showNote: false },
  { id: 4, text: 'Sanitize front counters', category: 'FOH', time: '09:15 AM', completed: false, note: '', showNote: false },
];

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Toggle the checkbox
  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Toggle the visibility of the note input
  const toggleNoteView = (id, e) => {
    e.stopPropagation(); // Prevents the checkbox from toggling when clicking the note icon
    setTasks(tasks.map(task => task.id === id ? { ...task, showNote: !task.showNote } : task));
  };

  // Update the actual text in the note
  const updateNote = (id, newNote) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, note: newNote } : task));
  };

  // Simulate sending to the manager
  const handleSendToManager = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Checklist Sent!",
        description: "Your task list and notes have been sent to the Manager on Duty.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }, 1500);
  };

  // Calculate completion for the CTA button
  const completedCount = tasks.filter(t => t.completed).length;
  const isAllCompleted = completedCount === tasks.length;

  return (
    <Box maxW="800px" mx="auto">
      {/* Header */}
      <Flex align="center" mb={6} justify="space-between">
        <Flex align="center">
          <Icon as={FiCheckSquare} color="brand.500" boxSize={6} mr={3} />
          <Text fontSize="2xl" fontWeight="bold" color="brand.900">Daily Duties</Text>
        </Flex>
        <Badge colorScheme={isAllCompleted ? "green" : "brand"} fontSize="sm" px={3} py={1} borderRadius="full">
          {completedCount} / {tasks.length} Done
        </Badge>
      </Flex>

      {/* Task List */}
      <Box bg="surface.white" p={{ base: 4, md: 6 }} borderRadius="xl" shadow="sm" mb={6}>
        <VStack align="stretch" spacing={0} divider={<Divider borderColor="gray.100" />}>
          <AnimatePresence>
            {tasks.map((task) => (
              <MotionBox 
                key={task.id} 
                layout 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                transition={{ duration: 0.2 }} 
                p={4} 
                _hover={{ bg: 'gray.50' }} 
                borderRadius="md" 
                cursor="pointer" 
                onClick={() => toggleTask(task.id)}
              >
                <HStack spacing={4} align="flex-start" justify="space-between">
                  <HStack spacing={4} align="flex-start" flex="1">
                    <Checkbox 
                      size="lg" 
                      colorScheme="brand" 
                      isChecked={task.completed} 
                      onChange={() => toggleTask(task.id)} 
                      mt={1} 
                    />
                    <VStack align="start" spacing={1} flex="1">
                      <Text 
                        fontSize="lg" 
                        fontWeight="medium" 
                        color={task.completed ? 'gray.400' : 'gray.700'} 
                        textDecoration={task.completed ? 'line-through' : 'none'} 
                        transition="all 0.2s"
                      >
                        {task.text}
                      </Text>
                      <HStack spacing={3}>
                        <Badge colorScheme={task.category === 'Safety' ? 'red' : 'blue'} variant="subtle">
                          {task.category}
                        </Badge>
                        <Flex align="center" color="gray.400" fontSize="sm">
                          <Icon as={FiClock} mr={1} />
                          <Text>{task.time}</Text>
                        </Flex>
                      </HStack>
                    </VStack>
                  </HStack>

                  {/* Note Toggle Button */}
                  <IconButton
                    aria-label="Add note"
                    icon={<FiMessageSquare />}
                    size="sm"
                    variant={task.note || task.showNote ? "solid" : "ghost"}
                    colorScheme={task.note ? "brand" : "gray"}
                    onClick={(e) => toggleNoteView(task.id, e)}
                  />
                </HStack>

                {/* Collapsible Note Input */}
                <Collapse in={task.showNote} animateOpacity>
                  <Box mt={4} pl={10} onClick={(e) => e.stopPropagation()}>
                    <Textarea 
                      placeholder="Add a note for the manager (e.g., 'Completed, but the fridge motor sounds loud.')"
                      size="sm"
                      bg="white"
                      value={task.note}
                      onChange={(e) => updateNote(task.id, e.target.value)}
                      focusBorderColor="brand.500"
                      borderRadius="md"
                    />
                  </Box>
                </Collapse>

              </MotionBox>
            ))}
          </AnimatePresence>
        </VStack>
      </Box>

      {/* Submit to Manager CTA */}
      <Button
        w="full"
        size="lg"
        h="16"
        colorScheme="brand"
        bg="brand.500"
        rightIcon={<FiSend />}
        isLoading={isSubmitting}
        loadingText="Sending..."
        onClick={handleSendToManager}
        _hover={{ bg: "brand.600", transform: "translateY(-2px)", shadow: "md" }}
        transition="all 0.2s"
      >
        Send List & Notes to Manager
      </Button>

    </Box>
  );
}