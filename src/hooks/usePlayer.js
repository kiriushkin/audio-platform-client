import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSearchParams } from 'react-router-dom';
import { useApi, useLocalStorage, useLoader } from './index.js';
import actionCreators from '../store/action-creators/index.js';

// navigator.mediaSession.metadata = new MediaMetadata({
//   title: audio[index].title,
//   artist: 'Audio Platform',
//   artwork: [
//     {
//       src: logo,
//       sizes: '1024x1024',
//       type: 'image/webp',
//     },
//   ],
// });

const usePlayer = () => {
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { getSongs } = useApi();
  const { loader, changeLoaderState } = useLoader();

  const song = useLocalStorage(player, 'song', {});
  const volume = useLocalStorage(player, 'volume', {});

  const AC = bindActionCreators(actionCreators, dispatch);

  const { setSong, setSongs, setActualSongs, setVolume, setKeyboardControls } =
    AC;

  const updateSongs = async () => {
    changeLoaderState(true);
    const newSongs = await getSongs();
    setSongs(newSongs);
    setActualSongs(newSongs);
    changeLoaderState(false);
  };

  const search = (query) => {
    const actualSongs = player.songs.filter((song) =>
      song.title.toUpperCase().match(query.toUpperCase())
    );

    setActualSongs(actualSongs);
  };

  const switchSong = (song, autoplay = true) => {
    if (song === null) {
      const emptySong = {
        duration: 0,
        durationFormatted: '0:00',
        currentTime: 0,
        currentTimeFormatted: '0:00',
        isPlaying: false,
      };

      return setSong(emptySong);
    }
    const newSong = {
      ...song,
      currentTime: 0,
      currentTimeFormatted: '0:00',
      isPlaying: autoplay,
    };
    setSong(newSong);
  };

  const setCurrentTime = (currentTime) => {
    const currentTimeFormatted = formatTime(currentTime);
    const newSong = { ...player.song, currentTime, currentTimeFormatted };
    setSong(newSong);
  };

  const setSelectionTime = (time) => {
    const selectedTime = formatTime(time);
    const newSong = { ...player.song, selectedTime };
    setSong(newSong);
  };

  const changePlayingState = (state) => {
    const newSong = { ...player.song, isPlaying: state };
    setSong(newSong);
  };

  useEffect(() => {
    if (loader) return;
    const emptySong = {
      duration: 0,
      durationFormatted: '0:00',
      currentTime: 0,
      currentTimeFormatted: '0:00',
      isPlaying: false,
    };

    const newVolume = { value: 1, isMuted: false };

    setVolume(volume.value ? volume : newVolume);

    if (player.songs.length === 0) return setSong(emptySong);

    const shareId = +searchParams.get('share');

    const newSong = shareId
      ? player.songs.find((item) => item.id === shareId) || player.songs[0]
      : player.songs[0];

    newSong.currentTime = 0;
    newSong.currentTimeFormatted = '0:00';
    newSong.selectedTime = '0:00';
    newSong.isPlaying = false;

    if (!player.songs.find((item) => item.id === song.id))
      return setSong(newSong);

    setSong(song.url && !shareId ? { ...song, isPlaying: false } : newSong);
  }, [player.songs]);

  return {
    player,
    updateSongs,
    search,
    setCurrentTime,
    setSelectionTime,
    switchSong,
    changePlayingState,
    setVolume,
    setKeyboardControls,
  };
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${String(seconds).length === 1 ? '0' + seconds : seconds}`;
};

export default usePlayer;
