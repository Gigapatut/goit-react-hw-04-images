import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={css.load}>
      <button className={css.loadMore}>
        <span type="button" onClick={onClick}>
          Load more
        </span>
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
