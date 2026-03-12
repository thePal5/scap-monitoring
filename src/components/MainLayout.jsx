import React from 'react';
import { Box, CloseButton, Flex, Icon, Text, Drawer, DrawerContent, useDisclosure, IconButton, VStack, HStack, Avatar } from '@chakra-ui/react';
import { FiHome, FiCheckSquare, FiClock, FiFileText, FiMenu, FiBell } from 'react-icons/fi';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome },
  { name: 'Task List', icon: FiCheckSquare },
  { name: 'Attendance', icon: FiClock },
  { name: 'Reports', icon: FiFileText },
];

const SidebarContent = ({ onClose, currentView, setCurrentView, ...rest }) => {
  return (
    <Box bg="surface.white" borderRight="1px" borderRightColor="surface.gray" w={{ base: 'full', md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="heading" fontWeight="bold" color="brand.900">SCAP</Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack spacing={2} align="stretch" px={4}>
        {LinkItems.map((link) => {
          const isActive = currentView === link.name;
          return (
            <Box key={link.name} as="a" href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Flex align="center" p="4" mx="2" borderRadius="lg" role="group" cursor="pointer" transition="all 0.2s" bg={isActive ? 'brand.500' : 'transparent'} color={isActive ? 'white' : 'gray.600'} _hover={{ bg: isActive ? 'brand.600' : 'brand.50', color: isActive ? 'white' : 'brand.900' }} onClick={() => { setCurrentView(link.name); if (onClose) onClose(); }}>
                <Icon mr="4" fontSize="16" as={link.icon} />
                <Text fontWeight="medium">{link.name}</Text>
              </Flex>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

const MobileNav = ({ onOpen, currentView, ...rest }) => {
  return (
    <Flex ml={{ base: 0, md: 60 }} px={{ base: 4, md: 8 }} height="20" alignItems="center" bg="surface.white" borderBottomWidth="1px" borderBottomColor="surface.gray" justifyContent="space-between" {...rest}>
      <Flex align="center" display={{ base: 'flex', md: 'none' }}>
        <IconButton onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} mr={4} />
        <Text fontSize="xl" fontWeight="bold" color="brand.900">{currentView}</Text>
      </Flex>

      <HStack spacing={{ base: 3, md: 6 }} ml="auto">
        <Flex alignItems="center">
          <HStack spacing={3}>
            <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-end" spacing="1px">
              <Text fontSize="xs" color="gray.500" fontWeight="medium">Welcome back,</Text>
              <Text fontSize="sm" fontWeight="bold" color="brand.900">Alex Chef</Text>
            </VStack>
            <Avatar size="sm" name="Alex Chef" src="https://bit.ly/dan-abramov" bg="brand.500" color="white" />
          </HStack>
        </Flex>
        <Box position="relative">
          <IconButton size="md" variant="ghost" aria-label="Notifications" icon={<Icon as={FiBell} boxSize={5} />} color="gray.600" _hover={{ bg: 'surface.gray', color: 'brand.500' }} />
          <Box position="absolute" top="2" right="2" p="1" bg="red.500" border="2px solid white" borderRadius="full" />
        </Box>
      </HStack>
    </Flex>
  );
};

export default function MainLayout({ children, currentView, setCurrentView }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="surface.gray">
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} currentView={currentView} setCurrentView={setCurrentView} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} currentView={currentView} setCurrentView={setCurrentView} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} currentView={currentView} />
      <Box ml={{ base: 0, md: 60 }} p={{ base: 4, md: 8 }}>
        {children}
      </Box>
    </Box>
  );
}