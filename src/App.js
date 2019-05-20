import React, {Component} from 'react';
import './style/App.css';
import settings from './pics/settings-work-tool.svg';
import search from './pics/search.svg';

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='mainContainer'>
        <div className='searchBar'>
          <img className='setting' src={settings} alt='settings'></img>
          <input className='searchInput' placeholder='Berlin'></input>
          <button>
            <img className='search' src={search} alt='search'></img>
          </button>
        </div>

        <div className='content'>

        </div>
      </div>
    );
  }
}

export default App;
