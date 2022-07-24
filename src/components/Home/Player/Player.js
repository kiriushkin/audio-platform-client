import './Player.scss';
import { useState, useRef, useEffect } from 'react';
import { usePlayer } from '../../../hooks/index.js';

const PLAY_ICON_CLASS = 'fa-solid fa-play';
const PAUSE_ICON_CLASS = 'fa-solid fa-pause';
const VOLUME_ICON_CLASS = 'fa-solid fa-volume-high';
const MUTED_ICON_CLASS = 'fa-solid fa-volume-xmark';

const Player = () => {
  const {
    player,
    setCurrentTime,
    setSelectionTime,
    switchSong,
    changePlayingState,
    setVolume,
  } = usePlayer();

  const { song, songs, volume, isKeyboardControls } = player;

  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

  const refs = {
    audio: useRef(null),
    progressContainer: useRef(null),
    progressBar: useRef(null),
    progressPointer: useRef(null),
    volumeToggle: useRef(null),
    volumeBar: useRef(null),
    volumeContainer: useRef(null),
  };

  const preventDefault = (e) => {
    e.preventDefault();
    return false;
  };

  const previousSong = () => {
    const index = songs.findIndex((item) => item.id === song.id);

    if (index > 0) switchSong(songs[index - 1]);
  };

  const nextSong = () => {
    const index = songs.findIndex((item) => item.id === song.id);

    if (index < songs.length - 1) switchSong(songs[index + 1]);
  };

  const changeVolume = (vol) => {
    const container = refs.volumeContainer.current;
    const newHeight = vol * container.clientHeight;

    refs.volumeBar.current.style.height = `${newHeight}px`;
    refs.audio.current.volume = vol;
  };

  const onKeyDownHandler = (e) => {
    if (!isKeyboardControls) return;
    if (e.code === 'Space' && song.url) changePlayingState(!song.isPlaying);
    if (e.code === 'KeyM') volumeIconOnClick();
  };

  const playOnClickHandler = () => {
    changePlayingState(!song.isPlaying);
  };

  const updateTimeline = () => {
    refs.progressBar.current.style.width = `${
      (song.currentTime / song.duration) * 100
    }%`;
  };

  const onAudioEndedHandler = () => {
    if (songs.findIndex((item) => item.id === song.id) !== songs.length - 1)
      return nextSong();

    changePlayingState(false);
  };

  const onTimeUpdateHandler = () => {
    const { currentTime } = refs.audio.current;
    setCurrentTime(currentTime);
  };

  const timelineOnMouseMoveHandler = (e) => {
    const { duration } = refs.audio.current;
    const cursorPos = e.clientX - 18;
    const selectedTime =
      (cursorPos / refs.progressContainer.current.clientWidth) * duration;

    setSelectionTime(song.url ? selectedTime : 0);

    refs.progressPointer.current.style.left = `${cursorPos}px`;
  };

  const timelineOnClickHandler = (e) => {
    if (!song.url) return;

    const { duration } = refs.audio.current;
    const cursorPos = e.clientX;
    const pointerTime =
      (cursorPos / refs.progressContainer.current.clientWidth) * duration;

    refs.audio.current.currentTime = pointerTime;
    setCurrentTime(pointerTime);
  };

  const volumeBarOnMouseDown = (e) => {
    setIsDrag(true);

    const container = refs.volumeContainer.current;
    const newHeight = -(e.clientY - container.getBoundingClientRect().bottom);
    const newVolume = newHeight / container.clientHeight;

    refs.volumeBar.current.style.height = `${newHeight}px`;
    refs.audio.current.volume = newVolume;

    setVolume({ ...volume, value: newVolume, isMuted: false });
  };

  const volumeBarOnMouseMove = (e) => {
    if (!isDrag) return;

    const container = refs.volumeContainer.current;
    const newHeight = -(e.clientY - container.getBoundingClientRect().bottom);
    const newVolume = newHeight / container.clientHeight;

    refs.volumeBar.current.style.height = `${newHeight}px`;
    refs.audio.current.volume = newVolume;

    setVolume({ ...volume, value: newVolume, isMuted: false });
  };

  const volumeIconOnClick = () => {
    if (volume.isMuted) {
      changeVolume(volume.value);

      return setVolume({ ...volume, isMuted: false });
    }

    changeVolume(0);
    setVolume({ ...volume, isMuted: true });
  };

  // Reapplying KeyDown Handler
  useEffect(() => {
    document.onkeydown = onKeyDownHandler;
    return () => {
      document.onkeydown = null;
    };
  });

  // Play and pause audio on song state change
  useEffect(() => {
    if (song.isPlaying && refs.audio.current.paused) refs.audio.current.play();
    if (!song.isPlaying && !refs.audio.current.paused)
      refs.audio.current.pause();
  }, [song.isPlaying, song.id]);

  // Change volume bar on volume change
  useEffect(() => {
    if (volume.isMuted) changeVolume(0);
    else if (volume.value) changeVolume(volume.value);
  }, [volume]);

  // Change timeline and audio on currentTime change
  useEffect(() => {
    if (song.currentTime) updateTimeline();
  }, [song.currentTime]);

  // Change control buttons states on song/songs change
  useEffect(() => {
    if (song.currentTime) refs.audio.current.currentTime = song.currentTime;

    if (songs.length === 0) {
      setIsFirst(true);
      return setIsLast(true);
    }

    if (songs.findIndex((item) => item.id === song.id) === 0) setIsFirst(true);
    else setIsFirst(false);

    if (songs.findIndex((item) => item.id === song.id) === songs.length - 1)
      setIsLast(true);
    else setIsLast(false);
  }, [song.id, songs]);

  return (
    <div className="player">
      <audio
        title={song.title}
        src={song.url}
        onTimeUpdate={onTimeUpdateHandler}
        onEnded={onAudioEndedHandler}
        ref={refs.audio}
      ></audio>

      <div className="player__container">
        <div
          className="player__progress-container"
          onMouseMove={timelineOnMouseMoveHandler}
          onClick={timelineOnClickHandler}
          ref={refs.progressContainer}
        >
          <div className="player__progress-current">
            {song.currentTimeFormatted}
          </div>
          <div className="player__progress-duration">
            {song.durationFormatted}
          </div>
          <div className="player__progress-bar" ref={refs.progressBar}></div>
          <div className="player__progress-pointer" ref={refs.progressPointer}>
            {song.selectedTime}
          </div>
        </div>

        <div className="player__controls-container">
          <div className="player__controls-title">{song.title}</div>
          <div className="player__controls-buttons">
            <button
              className={`player__controls-prev ${
                isFirst ? 'player__controls_disabled' : ''
              }`}
              onClick={isFirst ? null : previousSong}
              onKeyDown={preventDefault}
            >
              <i className="fa-solid fa-backward-step"></i>
            </button>

            <button
              className={`player__controls-play${
                song.url ? '' : ' player__controls_disabled'
              }`}
              onClick={song.url ? playOnClickHandler : null}
              onKeyDown={preventDefault}
            >
              <i
                className={song.isPlaying ? PAUSE_ICON_CLASS : PLAY_ICON_CLASS}
              ></i>
            </button>

            <button
              className={`player__controls-next ${
                isLast ? 'player__controls_disabled' : ''
              }`}
              onClick={isLast ? null : nextSong}
              onKeyDown={preventDefault}
            >
              <i className="fa-solid fa-forward-step"></i>
            </button>
          </div>

          <button
            className="player__controls-volume-button"
            onKeyDown={preventDefault}
          >
            <i
              className={volume.isMuted ? MUTED_ICON_CLASS : VOLUME_ICON_CLASS}
              onClick={volumeIconOnClick}
            ></i>
            <div className="player__controls-volume-wrapper">
              <div
                className="player__controls-volume-container"
                ref={refs.volumeContainer}
                onMouseDown={volumeBarOnMouseDown}
                onMouseUp={() => {
                  setIsDrag(false);
                }}
                onMouseLeave={() => {
                  setIsDrag(false);
                }}
                onMouseMove={volumeBarOnMouseMove}
              >
                <div
                  className="player__controls-volume-bar"
                  ref={refs.volumeBar}
                >
                  <div
                    className="player__controls-volume-toggle"
                    ref={refs.volumeToggle}
                  ></div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
