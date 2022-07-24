import './SongList.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usePlayer, useToken } from '../../../hooks/index.js';
import Search from './Search/Search.js';
import SongListItem from './SongListItem.js';

const SongsList = () => {
  const navigate = useNavigate();

  const { player, updateSongs } = usePlayer();
  const { token } = useToken();

  const uploadClickHandler = () => {
    navigate('/upload');
  };

  useEffect(() => {
    updateSongs();
  }, []);

  return (
    <div className="songs">
      <nav className="songs__nav">
        <Search />
        {token.user && token.user.role === 'admin' ? (
          <button
            className="songs__upload-btn button"
            onClick={uploadClickHandler}
          >
            <span>Upload Audio</span>
            <i className="fa-solid fa-upload"></i>
          </button>
        ) : (
          ''
        )}
      </nav>
      <div className="song-list">
        {player.actualSongs.length > 0 ? (
          player.actualSongs.map((item) => {
            return <SongListItem key={item.id} item={item} />;
          })
        ) : (
          <div className="song-list__empty">No results</div>
        )}
      </div>
    </div>
  );
};

export default SongsList;
