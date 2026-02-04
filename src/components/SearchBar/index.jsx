import "./styles.css";

const SearchBar = ({ action, onClick }) => {


  return (
    <form action={action} className="form-search">
      <label className="search-bar">
        <input type="text" placeholder="Digite a cidade" name="search" />
        <button onClick={onClick} type="submit">
          <img src="./search.svg" alt="ícone de busca" />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
