import { useState } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import RelatedLinks from './components/RelatedLinks';

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
    {
      id: '03',
      src: `${import.meta.env.BASE_URL}audio/voice-03.mp3`,
      title: 'たーめーのさにゃえだにゃん',
    },
    {
      id: '04',
      src: `${import.meta.env.BASE_URL}audio/voice-04.mp3`,
      title: '撫でてほしいな',
    },
    {
      id: '05',
      src: `${import.meta.env.BASE_URL}audio/voice-05.mp3`,
      title: 'さなえじゃないよさにゃえだにゃん',
    },
    {
      id: '06',
      src: `${import.meta.env.BASE_URL}audio/voice-06.mp3`,
      title: 'もえもえきゅん',
    },
  ];

  // 関連リンク
  const relatedLinks = [
    {
      url: 'https://sanae-fanclub.f5.si/',
      label: '公式サイト',
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

  const handleTrackChange = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="app-container">

      <div className="main-wrapper">
        <div className="content-wrapper">
          {/* メインコンテンツ - 3カラムレイアウト */}
          <div className="main-content">
            {/* 左側カラム - プレイリスト */}
            <div className="left-column">
              <Playlist
                playlist={playlist}
                currentTrackIndex={currentTrackIndex}
                onSelectTrack={handleTrackChange}
                isPlaying={isPlaying}
              />
            </div>

            {/* 中央カラム - オーディオプレーヤー */}
            <div className="center-column">
              <h1 className="app-title">Sanyatify</h1>
              <AudioPlayer
                playlist={playlist}
                currentTrackIndex={currentTrackIndex}
                onTrackChange={handleTrackChange}
              />
            </div>

            {/* 右側カラム - 関連リンク＆ライブラリ情報 */}
            <div className="right-column">
              {/* 関連リンク */}
              <RelatedLinks links={relatedLinks} />

              {/* 使用ライブラリ情報 */}
              <div className="library-info-box">
                <h3 className="library-info-title">使用ライブラリ</h3>
                <ul className="library-list">
                  <li className="library-list-item">React</li>
                  <li className="library-list-item">TypeScript</li>
                  <li className="library-list-item">Vite</li>
                </ul>
                <p className="library-footer-text">このアプリはClaude Codeを活用し開発しました</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
