import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdPlayArrow, MdMusicNote } from 'react-icons/md';

interface Track {
  id: string;
  src: string;
  title: string;
}

interface PlaylistProps {
  playlist: Track[];
  currentTrackIndex: number;
  onSelectTrack: (index: number) => void;
  isPlaying?: boolean;
}

const Playlist = ({
  playlist,
  currentTrackIndex,
  onSelectTrack,
  isPlaying = false,
}: PlaylistProps) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack gap={3} align="stretch" width="100%">
      <Text
        fontSize="xl"
        fontWeight="semibold"
        color="pink.500"
        mb={2}
      >
        Playlist
      </Text>

      <Box
        maxH={{ base: '300px', lg: '500px' }}
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ff6b9d',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#e6005f',
          },
        }}
      >
        <VStack gap={4} align="stretch">
          {playlist.map((track, index) => {
            const isCurrentTrack = index === currentTrackIndex;

            return (
              <Box
                key={track.id}
                p={4}
                cursor="pointer"
                background={bgColor}
                borderRadius="lg"
                border={isCurrentTrack ? '4px solid' : '2px solid'}
                borderColor={isCurrentTrack ? 'pink.500' : borderColor}
                onClick={() => onSelectTrack(index)}
              >
                <HStack justify="space-between">
                  <HStack gap={3}>
                    <Icon
                      as={isCurrentTrack ? MdPlayArrow : MdMusicNote}
                      boxSize={5}
                      color="pink.500"
                    />
                    <Text
                      fontWeight={isCurrentTrack ? 'bold' : 'normal'}
                      color={textColor}
                      fontSize="md"
                    >
                      {track.title}
                    </Text>
                  </HStack>
                  {isCurrentTrack && isPlaying && (
                    <Badge
                      colorScheme="pink"
                      variant="solid"
                      fontSize="xs"
                      css={{
                        animation: 'pulse 1s infinite',
                        '@keyframes pulse': {
                          '0%, 100%': {
                            opacity: 1,
                          },
                          '50%': {
                            opacity: 0.5,
                          },
                        },
                      }}
                    >
                      Now Playing
                    </Badge>
                  )}
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </VStack>
  );
};

export default Playlist;
