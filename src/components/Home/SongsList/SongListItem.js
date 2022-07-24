import { useState } from 'react';
import { usePlayer, useAlert, useToken, useApi } from '../../../hooks/index.js';
import Modal from '../../Modal/Modal.js';

const PLAY_ICON_CLASS = 'fa-solid fa-play';
const PAUSE_ICON_CLASS = 'fa-solid fa-pause';
const HOLLOW_LIKE_ICON = 'fa-regular fa-heart';
const FILLED_LIKE_ICON = 'fa-solid fa-heart';

const APP_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://audio-platform.netlify.app/'
    : 'http://localhost:3000/';

const SongListItem = ({ item }) => {
  const { token } = useToken();
  const {
    player,
    switchSong,
    updateSongs,
    changePlayingState,
    setKeyboardControls,
  } = usePlayer();
  const { sendMessage, sendError } = useAlert();
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

  const onSaveHandler = async (e) => {
    if (e.type !== 'click' && e.code !== 'Enter') return;

    const resp = await updateSong({ id: item.id, title: text }, token.value);

    setIsEditing(false);

    if (resp.status !== 200)
      return sendError(resp.statusText, resp.data.message);

    item.title = text;

    sendMessage('Title change', 'Song title successfuly changed.');
  };

  const onCancelClickHandler = () => {
    setIsEditing(false);
    setText(item.title);
  };

  const onDeleteClickHandler = () => {
    setIsModalShown(true);
  };

  const onShareClickHandler = () => {
    navigator.clipboard.writeText(`${APP_URL}?share=${item.id}`);
    sendMessage('Copied', 'Share link is copied to clipboard.');
  };

  const onModalConfirm = async () => {
    if (player.song.id === item.id) {
      const index = player.songs.findIndex(
        (item) => item.id === player.song.id
      );
      switchSong(player.songs[index - 1] || null, false);
    }

    const resp = await deleteSong({ id: item.id }, token.value);

    if (resp.status !== 200)
      return sendError(resp.statusText, resp.data.message);

    updateSongs();

    setTimeout(() => {
      setIsModalShown(false);
    }, 500);

    sendMessage('Delete audio', 'Audio successfuly deleted.');
  };

  const onModalCancel = () => {
    setTimeout(() => {
      setIsModalShown(false);
    }, 500);
  };

  return (
    <>
      {isModalShown ? (
        <Modal
          props={{
            title: 'Delete audio',
            text: 'Are you sure you want to delete this audio?',
            onConfirm: onModalConfirm,
            onCancel: onModalCancel,
          }}
        />
      ) : (
        ''
      )}

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
            onKeyDown={onSaveHandler}
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
        )}

        {token.user && token.user.role === 'admin' ? (
          !isEditing ? (
            <>
              <button
                className="song-list-item__admin-button"
                onClick={onEditClickHandler}
                onKeyDown={preventDefault}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="song-list-item__admin-button"
                onClick={onDeleteClickHandler}
                onKeyDown={preventDefault}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </>
          ) : (
            <>
              <button onClick={onSaveHandler} onKeyDown={preventDefault}>
                <i className="fa-regular fa-floppy-disk"></i>
              </button>
              <button onClick={onCancelClickHandler} onKeyDown={preventDefault}>
                <i className="fa-solid fa-ban"></i>
              </button>
            </>
          )
        ) : (
          ''
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
          onClick={onShareClickHandler}
          onKeyDown={preventDefault}
        >
          <i className="fa-solid fa-share"></i>
        </button>
      </div>
    </>
  );
};

export default SongListItem;
