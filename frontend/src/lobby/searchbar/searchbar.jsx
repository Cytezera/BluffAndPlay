import React,{ useState, useEffect } from "react";

const Searchbar = () => {
    const [query,setQuery] = useState("");
    const handleChange = (e) =>{
        setQuery(e.target.value);
    }
    return (
        <div>
            <input type="text" value ={query} onChange={handleChange} placeholder="Enter room key"/>
            <button></button>
        </div>
    );
};
export default Searchbar;
