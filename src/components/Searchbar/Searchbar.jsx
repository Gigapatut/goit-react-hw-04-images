import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

const { Component } = require('react');

const Searchbar = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleChange = evt => {
    setSearchQuery(evt.target.value);
};

const handleSubmit = evt => {
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search topic !');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
};

    return (
      <>
        <div className={css.header }>
          <form className={css.form} onSubmit={handleSubmit}>
            <button className={css.formButton }  type="submit">
              <FaSearch size={22} />
              <span className={css.buttonLabel} >Search</span>
            </button>
            <input
              className={css.input}
              type="text"
              name="searchQuery"
              autoComplete="off"
              autoFocus={true}
              placeholder="Search images and photos"
              value={searchQuery}
              onChange={handleChange}
            />
          </form>
        </div>
      </>
    );
  }

export default Searchbar;
