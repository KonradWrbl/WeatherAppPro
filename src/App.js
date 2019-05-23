import React, {Component} from 'react';
import './style/App.css';
import './style/CityComp.css'
import CityComp from './components/CityComp'
import settings from './pics/settings-work-tool.svg';
import search from './pics/search.svg';

let cityList = [

]

class App extends Component {

  constructor() {
    super()
    this.state = {

    }
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
        <CityComp/>
        <CityComp/>
        <CityComp/>
        <CityComp/>
        <CityComp/>
      </div>
    );
  }
}

export default App;
