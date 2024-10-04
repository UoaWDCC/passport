import React from "react";

const noMatchesStyle: React.CSSProperties = {
    marginTop: "1rem", 
  };

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noMatches: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange, noMatches }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={onSearchChange}
        className="search-input"
      />
      {noMatches && <div style={noMatchesStyle}> Sorry, item not found.</div>}
    </div>
  );
};

export default SearchBar;
