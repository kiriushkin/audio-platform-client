import './SongList.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usePlayer } from '../../../hooks/index.js';
import SongListItem from './SongListItem.js';

const SongsList = () => {
  const navigate = useNavigate();

  const { player, updateSongs } = usePlayer();

  const uploadClickHandler = () => {
    navigate('/upload');
  };

  useEffect(() => {
    updateSongs();
  }, []);

  useEffect(() => {
    console.log(player.actualSongs);
  }, [player.actualSongs]);

  return (
    <div className="songs">
      <nav className="songs__nav"></nav>
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
