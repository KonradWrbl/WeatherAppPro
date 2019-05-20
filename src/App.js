import React, {Component} from 'react';
import './style/App.css';
import settings from './pics/settings-work-tool.svg';
import search from './pics/search.svg';
import sun from './pics/1164891-weather/svg/046-sunny.svg'

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

        <div className='contentContainer'>
          <p className='city'>Rzeszów</p>
          <div><p>23°27'N</p><p>23°27'S</p></div>
          <img className='weather' src={sun}></img>
        </div>
      </div>
    );
  }
}

export default App;
