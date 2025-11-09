import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  // プレイリスト
  const playlist = [
    { file: 'voice-01.mp3', title: 'ラブビーム' },
    { file: 'voice-02.mp3', title: 'さにゃえだにゃん' },
  ];

  // State
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);

  // 再生/一時停止の切り替え
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('再生エラー:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  // 前の曲へ移動
  const playPrevious = () => {
    const newTrack = currentTrack > 0 ? currentTrack - 1 : playlist.length - 1;
    setCurrentTrack(newTrack);
    setIsPlaying(true);
  };

  // 次の曲へ移動
  const playNext = () => {
    const newTrack = currentTrack < playlist.length - 1 ? currentTrack + 1 : 0;
    setCurrentTrack(newTrack);
    setIsPlaying(true);
  };

  // プレイリストから曲を選択
  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  // シークバーの操作
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // 音量調整
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  // リピートのON/OFF
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

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
        audioRef.current.play().catch((error) => {
          console.error('自動再生エラー:', error);
          setIsPlaying(false);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  return (
    <div className="player-container">
      <div className="player">
        <h1 className="player-title">さにゃえ音声プレーヤー</h1>

        {/* オーディオ要素 */}
        <audio
          ref={audioRef}
          src={`${import.meta.env.BASE_URL}audio/${playlist[currentTrack].file}`}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => {
            if (isRepeat) {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
              }
            } else {
              playNext();
            }
          }}
        />

        {/* 現在再生中の曲 */}
        <div className="current-track">
          <div className="track-name">{playlist[currentTrack].title}</div>
        </div>

        {/* シークバー */}
        <div className="seek-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="seek-bar"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        {/* コントロールボタン */}
        <div className="controls">
          <button onClick={playPrevious} className="control-btn">
            ⏮
          </button>
          <button onClick={togglePlay} className="control-btn play-btn">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={playNext} className="control-btn">
            ⏭
          </button>
          <button
            onClick={toggleRepeat}
            className={`control-btn repeat-btn ${isRepeat ? 'active' : ''}`}
          >
            <img
              src={`${import.meta.env.BASE_URL}icon/repeat.png`}
              alt="repeat"
              className="repeat-icon"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </button>
        </div>

        {/* 音量調整 */}
        <div className="volume-container">
          <img
            src={`${import.meta.env.BASE_URL}icon/volume.png`}
            alt="volume"
            className="volume-icon"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          <input
            type="range"
            className="volume-bar"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>

        {/* プレイリスト */}
        <div className="playlist">
          <h2 className="playlist-title">Playlist</h2>
          <ul className="playlist-items">
            {playlist.map((track, index) => (
              <li
                key={index}
                className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
                onClick={() => selectTrack(index)}
              >
                <span className="track-number">{index + 1}</span>
                <span className="track-name">{track.title}</span>
                {index === currentTrack && isPlaying && (
                  <span className="now-playing">♫</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* 関連リンク */}
        <div className="related-links">
          <h2 className="links-title">関連リンク</h2>
          <div className="links-container">
            <a
              href="https://sanae-fanclub.f5.si/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
            >
              さにゃえファンクラブ
            </a>
            <a
              href="https://vrchat.com/home/group/grp_2ca4dc8e-761b-4326-9116-acad3aa7e20a"
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
            >
              早苗ファンクラブ(VRChatグループ)
            </a>
            <a
              href="https://vrchat.com/home/world/wrld_70fc4fca-bc96-4ee1-93d1-ce84d1571230/info"
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
            >
              VRChatワールド
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
