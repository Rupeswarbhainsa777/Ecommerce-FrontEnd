import { useState } from "react";

const SearchBox = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleText = (e) => {
        const text = e.target.value;
        setSearchText(text);
        onSearch(text);
    };

    return (
        <div className="input-group ms-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search for..."
                value={searchText}
                onChange={handleText}
                aria-label="Search input"
            />
            <span className="input-group-text bg-warning">
        <i className="bi bi-search"></i>
      </span>
        </div>
    );
};

export default SearchBox;
