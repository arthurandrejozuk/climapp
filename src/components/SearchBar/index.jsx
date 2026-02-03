import "./styles.css";

const SearchBar = ({ action }) => {


  return (
    <form action={action} className="form-search">
      <label className="search-bar">
        <input type="text" placeholder="Digite a cidade" name="search" />
        <button type="submit">
          <img src="./search.svg" alt="ícone de busca" />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
