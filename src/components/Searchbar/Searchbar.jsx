import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

const { Component } = require('react');

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ searchQuery: value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter a search topic !');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <>
        <div className={css.header }>
          <form className={css.form} onSubmit={this.handleSubmit}>
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
              value={this.state.searchQuery}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </>
    );
  }
}
export default Searchbar;
