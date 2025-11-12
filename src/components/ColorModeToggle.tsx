import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      colorScheme="pink"
      variant="ghost"
      size="lg"
      isRound
      position="fixed"
      top={4}
      right={4}
      _hover={{
        transform: 'rotate(20deg) scale(1.1)',
        boxShadow: '0 4px 12px rgba(255, 107, 157, 0.4)',
      }}
      transition="all 0.3s"
      zIndex={10}
    />
  );
};

export default ColorModeToggle;
