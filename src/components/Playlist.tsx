import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

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
  return (
    <div className="playlist-container">
      <h2 className="playlist-title">Playlist</h2>

      <div className="playlist-scroll">
        <div className="playlist-items">
          {playlist.map((track, index) => {
            const isCurrentTrack = index === currentTrackIndex;

            return (
              <div
                key={track.id}
                className={`playlist-item ${isCurrentTrack ? 'active' : ''}`}
                onClick={() => onSelectTrack(index)}
              >
                <div className="playlist-item-content">
                  <div className="playlist-item-inner">
                    <button className="playlist-play-button">
                      <FontAwesomeIcon icon={isCurrentTrack && isPlaying ? faPause : faPlay} />
                    </button>
                    <div className="playlist-item-text">
                      <span className={`playlist-item-title ${isCurrentTrack ? 'active' : ''}`}>
                        {track.title}
                      </span>
                      {isCurrentTrack && (
                        <span className="now-playing-badge">
                          Now Playing
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
