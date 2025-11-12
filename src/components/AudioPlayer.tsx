import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  IconButton,
  HStack,
  VStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { RepeatIcon } from '@chakra-ui/icons';

interface Track {
  id: string;
  src: string;
  title: string;
}

interface AudioPlayerProps {
  playlist: Track[];
  currentTrackIndex: number;
  onTrackChange: (index: number) => void;
}

const AudioPlayer = ({
  playlist,
  currentTrackIndex,
  onTrackChange,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const bgGradient = useColorModeValue(
    'linear-gradient(135deg, #ff6b9d 0%, #ffc3e0 100%)',
    'linear-gradient(135deg, #e6005f 0%, #ff6b9d 100%)'
  );

  const textColor = useColorModeValue('white', 'white');
  const iconColor = useColorModeValue('white', 'white');

  // 再生/一時停止の切り替え
  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          // ブラウザのポリシーで自動再生が禁止されている場合
        });
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  // 次の曲へ
  const playNext = useCallback(() => {
    const nextIndex =
      currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0;
    onTrackChange(nextIndex);
  }, [currentTrackIndex, playlist.length, onTrackChange]);

  // 前の曲へ
  const playPrevious = useCallback(() => {
    const prevIndex =
      currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1;
    onTrackChange(prevIndex);
  }, [currentTrackIndex, playlist.length, onTrackChange]);

  // 曲の終了時の処理
  const handleTrackEnd = useCallback(() => {
    if (isRepeat) {
      // リピートモードの場合は同じ曲を再生
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      // リピートモードでない場合は次の曲へ
      playNext();
    }
  }, [isRepeat, playNext]);

  // リピートの切り替え
  const toggleRepeat = useCallback(() => {
    setIsRepeat((prev) => !prev);
  }, []);

  // シークバーの操作
  const handleSeek = useCallback((value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  }, []);

  // 音量の変更
  const handleVolumeChange = useCallback((value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  }, []);

  // 時間のフォーマット
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // トラック変更時の処理
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // エラー処理
        });
      }
    }
  }, [currentTrackIndex]);

  // オーディオイベントの設定
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleTrackEnd);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [handleTrackEnd]);

  return (
    <VStack gap={6} width="100%">
      {/* 非表示のオーディオ要素 */}
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]?.src || ''}
        preload="metadata"
      />

      {/* 現在再生中の曲 */}
      <Box
        width="100%"
        padding={6}
        background={bgGradient}
        borderRadius="xl"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          {playlist[currentTrackIndex]?.title || 'No Track'}
        </Text>
      </Box>

      {/* シークバーと時間表示 */}
      <Box width="100%">
        <Slider
          aria-label="seek-slider"
          value={currentTime}
          min={0}
          max={duration || 0}
          onChange={handleSeek}
          focusThumbOnChange={false}
        >
          <SliderTrack bg="gray.200" h="6px">
            <SliderFilledTrack bg="pink.500" />
          </SliderTrack>
          <SliderThumb boxSize={4} bg="pink.500" />
        </Slider>
        <HStack justify="space-between" mt={2}>
          <Text fontSize="sm" color="gray.500">
            {formatTime(currentTime)}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {formatTime(duration)}
          </Text>
        </HStack>
      </Box>

      {/* コントロールボタン */}
      <HStack gap={4} justifyContent="center">
        <IconButton
          aria-label="Previous track"
          icon={<FaStepBackward />}
          onClick={playPrevious}
          colorScheme="pink"
          size="lg"
          isRound
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: '0 5px 15px rgba(255, 107, 157, 0.4)',
          }}
          transition="all 0.2s"
        />

        <IconButton
          aria-label={isPlaying ? 'Pause' : 'Play'}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          onClick={togglePlay}
          colorScheme="pink"
          size="lg"
          isRound
          w="70px"
          h="70px"
          fontSize="2xl"
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: '0 5px 15px rgba(255, 107, 157, 0.4)',
          }}
          transition="all 0.2s"
        />

        <IconButton
          aria-label="Next track"
          icon={<FaStepForward />}
          onClick={playNext}
          colorScheme="pink"
          size="lg"
          isRound
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: '0 5px 15px rgba(255, 107, 157, 0.4)',
          }}
          transition="all 0.2s"
        />

        <IconButton
          aria-label="Toggle repeat"
          icon={<RepeatIcon />}
          onClick={toggleRepeat}
          colorScheme="pink"
          variant={isRepeat ? 'solid' : 'outline'}
          size="lg"
          isRound
          opacity={isRepeat ? 1 : 0.6}
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: isRepeat
              ? '0 5px 15px rgba(255, 107, 157, 0.6)'
              : '0 5px 15px rgba(255, 107, 157, 0.4)',
          }}
          transition="all 0.2s"
          color={isRepeat ? iconColor : 'pink.500'}
        />
      </HStack>

      {/* 音量コントロール */}
      <Box width="100%" mt={4}>
        <Text fontSize="sm" color="gray.500" mb={2}>
          Volume
        </Text>
        <Slider
          aria-label="volume-slider"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          focusThumbOnChange={false}
        >
          <SliderTrack bg="gray.200" h="6px">
            <SliderFilledTrack bg="pink.500" />
          </SliderTrack>
          <SliderThumb boxSize={4} bg="pink.500" />
        </Slider>
      </Box>
    </VStack>
  );
};

export default AudioPlayer;
