import { useState, useRef, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faVolumeHigh, faBackwardStep, faForwardStep, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

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
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  }, []);

  // 音量の変更
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="audio-player">
      {/* 非表示のオーディオ要素 */}
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]?.src || ''}
        preload="metadata"
      />

      {/* アルバムアートエリア */}
      <div className="album-art-section">
        <div className="album-art">
          <span className="album-art-icon">🎵</span>
        </div>
        {/* 現在再生中の曲タイトル */}
        <h2 className="track-title">
          {playlist[currentTrackIndex]?.title || 'No Track'}
        </h2>
      </div>

      {/* シークバーと時間表示 */}
      <div className="seek-section">
        <div className="time-display">
          <span className="time-text">{formatTime(currentTime)}</span>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          className="seek-slider"
          value={currentTime}
          min={0}
          max={duration || 0}
          onChange={handleSeek}
          aria-label="Seek slider"
        />
      </div>

      {/* コントロールボタン */}
      <div className="controls">
        <button
          className="control-button"
          onClick={playPrevious}
          aria-label="Previous track"
        >
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>

        <button
          className="control-button play-button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>

        <button
          className="control-button"
          onClick={playNext}
          aria-label="Next track"
        >
          <FontAwesomeIcon icon={faForwardStep} />
        </button>

        <button
          className={`control-button repeat-button ${isRepeat ? 'active' : 'inactive'}`}
          onClick={toggleRepeat}
          aria-label="Toggle repeat"
        >
          <FontAwesomeIcon icon={faRepeat} />
        </button>
      </div>

      {/* 音量コントロール */}
      <div className="volume-section">
        <label className="volume-icon">
          <FontAwesomeIcon icon={faVolumeHigh} />
        </label>
        <input
          type="range"
          className="volume-slider"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          aria-label="Volume slider"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
