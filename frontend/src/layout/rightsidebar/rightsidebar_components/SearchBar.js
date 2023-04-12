import { useState } from "react";
import Searchicon from "../../../icons/SearchIcon.png";
import SearchiconHover from "../../../icons/SearchIconHover.png";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [hoverdetect, sethoverdetect]= useState(false);
  const [focusdetect, setfocusdetect]= useState(false);


  const fetchData = (value) => {
    fetch(`http://localhost:8000/useraccounts?username=${value}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length == 0){
          setResults(
            [
              {username:"NULL",}
            ], // null results username 
          );
          // console.log("set null username for null returns");
        } else {
          setResults(json);
        // console.log(json);
        }
      });
  };

  const handleChange = (value) => {
    setInput(value);
    if(value=="") {
      setResults([]);
      // console.log("No input no result");
    } else {
      fetchData(value);
      // console.log("Have input fetch result");
    }
  };

  const handleHover = () => {
    // Do something
    document.getElementById("searchinput").style.display = 'flex';
    document.getElementById("input-wrapper").style.width = '270px';
    document.getElementById("search-bar-container").style.margin = '-30px 60px';
    sethoverdetect(true);
  };

  const afterHover = () => {
    // Do something
    if (!focusdetect) {
    document.getElementById("searchinput").style.display = 'none';
    document.getElementById("input-wrapper").style.width = '70px';
    document.getElementById("search-bar-container").style.margin = '-30px -50px -30px -50px';
    sethoverdetect(false);
    setResults([]);
    }
  };


  return (
    <div 
      id="input-wrapper"
      onMouseOver={handleHover}
      onMouseLeave={afterHover}>
      <input
        placeholder="Type to search..."
        value={input}
        id="searchinput"
        style={{'display': 'none'}}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => {setfocusdetect(true);}}
        onBlur={() => {setfocusdetect(false);}}
      />
      <div onClick={afterHover}>{hoverdetect == true || focusdetect == true ? 
      <img src={SearchiconHover} className="searchIcon"/> : 
      <img src={Searchicon} className="searchIcon"/>
      }</div>
    </div>
  );
};
