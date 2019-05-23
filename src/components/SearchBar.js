import React, { Component } from 'react';
import settings from '../pics/settings-work-tool.svg';
import search from '../pics/search.svg';

class SearchBar extends Component {
    render() {
        return(
            <div className='searchBar'>
                <img className='setting' src={settings} alt='settings'></img>
                <input className='searchInput' placeholder='Berlin'></input>
                <button>
                    <img className='search' src={search} alt='search'></img>
                </button>
            </div>
        );
    }
}

export default SearchBar;