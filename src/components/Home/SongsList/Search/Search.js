import './Search.scss';
import { useState } from 'react';
import { usePlayer } from '../../../../hooks/index.js';

const Search = () => {
  const { search } = usePlayer();

  const [text, setText] = useState('');

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setText(value);
    search(value);
  };

  return (
    <div className="search">
      <div className="search__container">
        <input
          type="text"
          id="search"
          className="search__input"
          onChange={onChangeHandler}
          value={text}
          placeholder="Type here..."
        ></input>
        <label
          htmlFor="search"
          className="search__icon fa-solid fa-magnifying-glass"
        ></label>
      </div>
    </div>
  );
};

export default Search;
