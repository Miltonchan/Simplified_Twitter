import { useState } from "react";
import Searchicon from "../../../icons/SearchIcon.png";
import SearchiconHover from "../../../icons/SearchIconHover.png";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [hoverdetect, sethoverdetect]= useState(false);
  const [focusdetect, setfocusdetect]= useState(false);


  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  }; //to be modified to actual results

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div 
      className="input-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onMouseOver={() => {sethoverdetect(true);}}
        onMouseLeave={() => {sethoverdetect(false);}}
        onFocus={() => {setfocusdetect(true);}}
        onBlur={() => {setfocusdetect(false);}}
      />
      <div>{hoverdetect == true || focusdetect == true ? 
      <img src={SearchiconHover} className="searchIcon"/> : 
      <img src={Searchicon} className="searchIcon"/>
      }</div>
    </div>
  );
};
