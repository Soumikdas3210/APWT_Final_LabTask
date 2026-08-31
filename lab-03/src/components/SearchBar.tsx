interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
}

function SearchBar({ query, onQueryChange, placeholder = 'Search students...' }: SearchBarProps) {
  return (
    <div className="search-bar">
      <span className="search-icon">⌕</span>
      <input
        className="search-input"
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(event) => onQueryChange(event.target.value)}
        aria-label="Search students by name or major"
      />
    </div>
  );
}

export default SearchBar;