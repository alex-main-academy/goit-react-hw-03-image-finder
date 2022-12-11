import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ submit }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={submit}>
        <button className={css.button}>
          <span className="button-label">Search</span>
        </button>

        <input
          name="searchInput"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
          required
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default Searchbar;
