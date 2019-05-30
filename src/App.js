import React, {Component} from 'react';
import './style/App.css';
import './style/CityComp.css'
import CityComp from './components/CityComp'
import settings from './pics/settings-work-tool.svg';
import search from './pics/search.svg';
import axios from 'axios';


const API = '//api.openweathermap.org/data/2.5/';

class App extends Component {

  constructor() {
    super()
    this.state = {
      city: '',
      isFetching: 0,
      cityList: []
    }
    this.addCity = this.addCity.bind(this);
    this.cityValue = this.cityValue.bind(this);
    this.deleteComp = this.deleteComp.bind(this)
  }

  // componentDidMount() {
  //   this.setState({cityList: JSON.parse(localStorage.getItem('cityList'))})
  // }

  addCity = () => {
    console.log(this.state.city);
    this.setState({isFetching: 1})
    let curr;

    axios.get(`${API}weather?q=${this.state.city}&appid=e86ba166de2e36b28f351cc82f422e7f`)
      .then((response) => {
        curr = response;
        //this.setState({cityList: this.state.cityList.concat(response)})
        console.log(response);
      })
      .then((res) => {
        //this.setState({isFetching: 0});
      })
      .catch(err => {
        console.log(err);
        //this.setState({isfetching: 0})
      })

      axios.get(`${API}forecast?q=${this.state.city}&appid=e86ba166de2e36b28f351cc82f422e7f`)
      .then((response) => {
        Object.assign(response.data, curr.data)
        this.setState({cityList: this.state.cityList.concat(response)})
        //this.setState({cityList: this.state.cityList.concat(response)})
        console.log(response);
      })
      .then((res) => {
        this.setState({isFetching: 0});
      })
      .catch(err => {
        console.log(err);
        this.setState({isfetching: 0})
      })


  }

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false && e.target.value !== '') {
      e.preventDefault();
      this.addCity();
      e.target.value=''
      console.log(this.state.cityList);
    }
  }

  cityValue = (e) => {
    this.setState({city: e.target.value})
  }

  deleteComp = (e) => {
    let index;

    for(let i=0; i<this.state.cityList.length; i++) {
      if(this.state.cityList[i].data.name === e.target.parentNode.id) {
        index = i;
        break;
      }
    }

    this.state.cityList.splice(index,1)
    e.target.parentNode.remove();
    //this.setState(prevState => ({cityList: prevState.cityList.splice(index,1)}))

    console.log(e.target.parentNode.id);
    //console.log(this.state.cityList[0].data.name);
    console.log(index);
  }


  render() {

    const cities = this.state.cityList.map(input => {return(
      <CityComp
        deleteFoo={this.deleteComp}
        name={input.data.name}
        coord={input.data.coord}
        temp={input.data.main.temp}
        pressure={input.data.main.pressure}
        weather={input.data.weather[0].main}
        ThreeDaysWeather={input.data.list}
        key={input.data.id}
      />
    )})

    return (
      <div className='mainContainer'>
        <div className='searchBar'>
          <img className='setting' src={settings} alt='settings'></img>
          <input
            className='searchInput'
            placeholder='Berlin'
            onChange={this.cityValue}
            onClick={e => e.target.value=''}
            onKeyDown={this.onEnterPress}
          >
          </input>
          <button onClick={this.addCity}>
            <img className='search' src={search} alt='search'></img>
          </button>
        </div>
        {cities}

      </div>
    );
  }
}

export default App;
