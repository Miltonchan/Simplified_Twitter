import React, { useState, useEffect } from 'react';
import './search.css';

import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";


export default function Search_component() {
    const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div id="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}
