import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Flex,
  Text,
  Image,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import RelatedLinks from './components/RelatedLinks';
import ColorModeToggle from './components/ColorModeToggle';

interface Track {
  id: string;
  src: string;
  title: string;
}

function App() {
  // プレイリスト
  const playlist: Track[] = [
    {
      id: '01',
      src: `${import.meta.env.BASE_URL}audio/voice-01.mp3`,
      title: 'ラブビーム',
    },
    {
      id: '02',
      src: `${import.meta.env.BASE_URL}audio/voice-02.mp3`,
      title: 'さにゃえだにゃん',
    },
  ];

  // 関連リンク
  const relatedLinks = [
    {
      url: 'https://sanae-fanclub.f5.si/',
      label: 'さにゃえファンクラブ',
    },
    {
      url: 'https://vrchat.com/home/group/grp_2ca4dc8e-761b-4326-9116-acad3aa7e20a',
      label: '早苗ファンクラブ(VRChatグループ)',
    },
    {
      url: 'https://vrchat.com/home/world/wrld_70fc4fca-bc96-4ee1-93d1-ce84d1571230/info',
      label: 'VRChatワールド',
    },
  ];

  // State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleTrackChange = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <Box minH="100vh" bg={bgColor} py={8} position="relative">
      <ColorModeToggle />

      <Container maxW="container.xl">
        <VStack gap={8} align="stretch">
          {/* タイトル */}
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            bgGradient="linear(to-r, pink.400, pink.600)"
            bgClip="text"
            fontWeight="bold"
          >
            さにゃえ音声プレーヤー
          </Heading>

          {/* メインコンテンツ */}
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={8}
            align="stretch"
          >
            {/* 左側カラム */}
            <VStack flex={1} gap={8} align="stretch">
              {/* オーディオプレーヤー */}
              <Box
                bg={cardBg}
                borderRadius="2xl"
                p={{ base: 6, md: 8 }}
                boxShadow={useColorModeValue(
                  '0 10px 40px rgba(0, 0, 0, 0.15)',
                  '0 10px 40px rgba(0, 0, 0, 0.5)'
                )}
              >
                <AudioPlayer
                  playlist={playlist}
                  currentTrackIndex={currentTrackIndex}
                  onTrackChange={handleTrackChange}
                />
              </Box>

              {/* 関連リンク */}
              <Box
                bg={cardBg}
                borderRadius="2xl"
                p={{ base: 6, md: 8 }}
                boxShadow={useColorModeValue(
                  '0 10px 40px rgba(0, 0, 0, 0.15)',
                  '0 10px 40px rgba(0, 0, 0, 0.5)'
                )}
              >
                <RelatedLinks links={relatedLinks} />
              </Box>
            </VStack>

            {/* 右側カラム - プレイリスト */}
            <Box
              flex={{ base: 1, lg: 0.5 }}
              minW={{ base: 'auto', lg: '300px' }}
              bg={cardBg}
              borderRadius="2xl"
              p={{ base: 6, md: 8 }}
              boxShadow={useColorModeValue(
                '0 10px 40px rgba(0, 0, 0, 0.15)',
                '0 10px 40px rgba(0, 0, 0, 0.5)'
              )}
            >
              <Playlist
                playlist={playlist}
                currentTrackIndex={currentTrackIndex}
                onSelectTrack={handleTrackChange}
                isPlaying={isPlaying}
              />
            </Box>
          </Flex>

          {/* プロフィール */}
          <Box
            bg={cardBg}
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            boxShadow={useColorModeValue(
              '0 10px 40px rgba(0, 0, 0, 0.15)',
              '0 10px 40px rgba(0, 0, 0, 0.5)'
            )}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={8}
              align={{ base: 'stretch', md: 'center' }}
              justify="space-between"
            >
              {/* 左側：説明文 */}
              <VStack align="start" gap={4} flex={1}>
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" color="pink.500" mb={2}>
                    このアプリについて
                  </Text>
                  <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.300')}>
                    みんなのアイドルさにゃえさんのボイスを思う存分聞けるプレーヤーです。
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="lg" fontWeight="semibold" color="pink.500" mb={2}>
                    使用ライブラリ
                  </Text>
                  <VStack align="start" gap={1}>
                    <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.300')}>
                      - Chakra UI
                    </Text>
                    <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.300')}>
                      - React H5 Audio Player
                    </Text>
                  </VStack>
                </Box>

                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} fontStyle="italic">
                  このアプリはClaude Codeを活用し開発しました
                </Text>
              </VStack>

              {/* 右側：プロフィール画像 */}
              <HStack gap={8} justify="center" flexWrap="wrap">
                {/* さにゃえプロフィール */}
                <VStack gap={3}>
                  <Image
                    src={`${import.meta.env.BASE_URL}pic/sanae-profile.png`}
                    alt="さにゃえ"
                    boxSize="150px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                  <VStack gap={1}>
                    <Text fontSize="md" fontWeight="semibold" color={useColorModeValue('gray.700', 'gray.300')}>
                      ボイス
                    </Text>
                    <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>
                      さにゃえ378
                    </Text>
                  </VStack>
                </VStack>

                {/* 作者プロフィール */}
                <VStack gap={3}>
                  <Image
                    src={`${import.meta.env.BASE_URL}pic/g0-profile.png`}
                    alt="g0"
                    boxSize="150px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                  <VStack gap={1}>
                    <Text fontSize="md" fontWeight="semibold" color={useColorModeValue('gray.700', 'gray.300')}>
                      作者
                    </Text>
                    <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>
                      g0(ジーゼロ)
                    </Text>
                  </VStack>
                </VStack>
              </HStack>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
