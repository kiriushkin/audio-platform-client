import { useState } from 'react';
import { usePlayer, useApi } from '../../../hooks/index.js';

const PLAY_ICON_CLASS = 'fa-solid fa-play';
const PAUSE_ICON_CLASS = 'fa-solid fa-pause';
const HOLLOW_LIKE_ICON = 'fa-regular fa-heart';
const FILLED_LIKE_ICON = 'fa-solid fa-heart';

const APP_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://audio-platform.netlify.app/'
    : 'http://localhost:3000/';

const SongListItem = ({ item }) => {
  const {
    player,
    switchSong,
    updateSongs,
    changePlayingState,
    setKeyboardControls,
  } = usePlayer();
  const { updateSong, deleteSong } = useApi();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.title);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const preventDefault = (e) => {
    e.preventDefault();
    return false;
  };

  const onEditClickHandler = () => {
    setIsEditing(true);
  };

  const onCancelClickHandler = () => {
    setIsEditing(false);
    setText(item.title);
  };

  const onDeleteClickHandler = () => {
    setIsModalShown(true);
  };

  const onModalCancel = () => {
    setTimeout(() => {
      setIsModalShown(false);
    }, 500);
  };

  return (
    <>
      <div
        className={`song-list__item song-list-item ${
          item.id === player.song.id ? 'song-list-item_current' : ''
        }`}
      >
        <button
          className="song-list-item__play-button"
          onClick={
            item.id === player.song.id
              ? () => {
                  changePlayingState(!player.song.isPlaying);
                }
              : () => {
                  switchSong(item);
                }
          }
          onKeyDown={preventDefault}
        >
          <i
            className={
              item.id === player.song.id && player.song.isPlaying
                ? PAUSE_ICON_CLASS
                : PLAY_ICON_CLASS
            }
          ></i>
        </button>
        {!isEditing ? (
          <div className="song-list-item__title">{item.title}</div>
        ) : (
          <input
            autoFocus
            className="song-list-item__title song-list-item__title_input"
            type="text"
            onFocus={() => {
              setKeyboardControls(false);
            }}
            onBlur={() => {
              setKeyboardControls(true);
            }}
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
        )}

        <div className="song-list-item__duration">{item.durationFormatted}</div>
        <div className="song-list-item__release-date">{item.releaseDate}</div>
        <button
          className={`song-list-item__like-button${isLiked ? ' animate' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
          onKeyDown={preventDefault}
        >
          <i className={isLiked ? FILLED_LIKE_ICON : HOLLOW_LIKE_ICON}></i>
        </button>
        <button
          className="song-list-item__share-button"
          onKeyDown={preventDefault}
        >
          <i className="fa-solid fa-share"></i>
        </button>
      </div>
    </>
  );
};

export default SongListItem;
