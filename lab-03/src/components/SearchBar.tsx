import {useContext} from 'react';
import {StudentContext} from '../context/StudentContext';

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({ placeholder = 'Search students...' }: SearchBarProps) {
  const { query, setQuery } = useContext(StudentContext);

  return (
    <div className="search-bar">
      <span className="search-icon">⌕</span>
      <input
        className="search-input"
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search students by name or major"
      />
    </div>
  );
}

export default SearchBar;