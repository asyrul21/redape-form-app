import React from 'react'

import './searchbar.css'

const SearchBar = (props) => {
    return (
        <div className="searchForm">
            <form className="searchForm">
                <input
                    className="searchBar"
                    placeholder="Search for movies"
                    type="text"
                    // value={this.state.query}
                    onChange={(event) => props.handleInputChange(event)}
                />
            </form>
        </div>
    )
}

export default SearchBar;