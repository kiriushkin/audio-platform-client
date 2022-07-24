import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useDropzone } from 'react-dropzone';
import './Upload.scss';
import { useAlert, useToken, useApi, useLoader } from '../../hooks';

const Upload = () => {
  const navigate = useNavigate();

  const { token } = useToken();
  const { sendMessage, sendError } = useAlert();
  const { sendSong } = useApi();
  const { changeLoaderState } = useLoader();

  const [title, setTitle] = useState('');
  const [file, setFile] = useState({});

  // const onDrop = useCallback(async (acceptedFiles) => {
  //   if (acceptedFiles.length === 0)
  //     return sendError(
  //       'Upload file error',
  //       'Try again or check the file extention!'
  //     );

  //   setFile(acceptedFiles[0]);

  //   if (title === '') setTitle(acceptedFiles[0].name.replace('.mp3', ''));
  // }, []);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0)
      return sendError(
        'Upload file error',
        'Try again or check the file extention!'
      );

    setFile(acceptedFiles[0]);

    if (title === '') setTitle(acceptedFiles[0].name.replace('.mp3', ''));
  };

  const { acceptedFiles, isDragActive, getRootProps, getInputProps, open } =
    useDropzone({
      onDrop,
      accept: { 'audio/mp3': ['.mp3'] },
      maxFiles: 1,
      noClick: true,
      noKeyboard: true,
    });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    changeLoaderState(true);

    if (title.length === 0) {
      e.target[0].focus();
      return sendError(
        'Title required',
        'Enter audio title before uploading an audio.'
      );
    }

    if (!file.name)
      return sendError(
        'File required',
        "Choose an audio file via button or drag 'n' drop it before upload button."
      );

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const releaseDate = `${String(day).length > 1 ? day : '0' + day}.${
      String(month).length > 1 ? month : '0' + month
    }.${date.getFullYear()}`;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('releaseDate', releaseDate);
    formData.append('file', file);

    const resp = await sendSong(formData, token.value);

    if (resp.status !== 201) return sendError('Error', resp.data.message);

    changeLoaderState(false);

    sendMessage('Successful upload', 'Upload complete.');

    navigate('/');
  };

  useEffect(() => {
    if (token.user && token.user.role !== 'admin') navigate('/');
  }, [token]);

  return (
    <div className="upload upload__container">
      <div className="upload__title">Upload Audio</div>

      <form className="upload__form upload-form" onSubmit={onSubmitHandler}>
        <div className="upload-form__dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          {acceptedFiles.length > 0 && !isDragActive ? (
            <div className="upload-form__container">
              <label htmlFor="title">Audio file</label>
              <div onClick={open} className="button">
                <span>{file.name}</span>
                <i className="fa-solid fa-folder"></i>
              </div>
            </div>
          ) : isDragActive ? (
            <>
              <div className="upload-form__container">
                <label htmlFor="title">Audio file</label>
                <div onClick={open} className="button">
                  <span>Choose</span>
                  <i className="fa-solid fa-folder"></i>
                </div>
              </div>
              <div className="upload-form__drop">
                <div className="upload-form__drop-text">Drop here...</div>
                <div className="upload-form__drop-text upload-form__drop-text_hint">
                  (Only *.mp3 files will be accepted)
                </div>
              </div>
            </>
          ) : (
            <div className="upload-form__container">
              <label htmlFor="title">Audio file</label>
              <div onClick={open} className="button">
                <span>Choose</span>
                <i className="fa-solid fa-folder"></i>
              </div>
            </div>
          )}
        </div>

        <div className="upload-form__container">
          <label htmlFor="title">Audio title</label>
          <input
            className="upload-form__title"
            type="text"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            placeholder="Enter the title here..."
          />
        </div>

        <div className="upload-form__container">
          <button className="button">
            <span>Upload</span>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
