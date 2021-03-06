import React, {Component} from 'react';
import './style/App.css';
import './style/CityComp.css'
import './style/Settings.css'
import CityComp from './components/CityComp'
import CityList from './components/CityList'
import Settings from './components/Settings'
import settings from './pics/settings-work-tool.svg';
import search from './pics/search.svg';
import axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import { Route, Link, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

const API = '//api.openweathermap.org/data/2.5/';

class App extends Component {

  constructor() {
    super()
    this.state = {
      city: '',
      isFetching: 0,
      cityList: [],
      cityNotFoundErr: 0,
      doubleCity: 0,
      scale: 0,
      routeDir: 1
    }
    this.addCity = this.addCity.bind(this);
    this.cityValue = this.cityValue.bind(this);
    this.deleteComp = this.deleteComp.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.setRoute = this.setRoute.bind(this);
    this.scaleChange = this.scaleChange.bind(this);
  }

  componentDidMount() {

    console.log(window.navigator.onLine);

    let cities = JSON.parse(localStorage.getItem('cityList'));
    if(cities && window.navigator.onLine) {
      for(let i = 0; i < cities.length; i++) {
        this.addCity(cities[i].data.name)
      }
    } else {
      this.setState({cityList: JSON.parse(localStorage.getItem('cityList')) ? JSON.parse(localStorage.getItem('cityList')) : []})
    }

    this.setState({scale: JSON.parse(localStorage.getItem('scale'))})
    //else {this.setState({cityList: []})}
  }

  // componentDidUpdate() {
  //   localStorage.setItem('scale', JSON.stringify(this.state.scale))
  // }

  scaleChange = () => {
    this.setState(prevState => ({scale: !prevState.scale}))
    localStorage.setItem('scale', JSON.stringify(!this.state.scale))
  }

  setRoute = () => {
    this.setState(prevState => ({routeDir: !prevState.routeDir}))
  }

  onSearch = () => {
    this.addCity(this.state.city);
  }

  addCity = (name) => {
    console.log(name);
    this.setState({isFetching: 1})
    let curr;

    axios.get(`${API}weather?q=${name}&appid=e86ba166de2e36b28f351cc82f422e7f`)
      .then((response) => {
        for(let i=0; i<this.state.cityList.length; i++) {
          if(this.state.cityList[i].data.id === response.data.id) {
            this.setState({doubleCity: 1})
            console.log('wykryto duplikację');
            return
          }
        }
        curr = response;
        //this.setState({cityList: this.state.cityList.concat(response)})
        //console.log(response);
      })
      .then((res) => {
        //this.setState({isFetching: 0});
      })
      .catch(err => {
        console.log(err);
        if(window.navigator.onLine && err.request) {
          this.setState({cityNotFoundErr: 1})
        }
        //this.setState({isfetching: 0})
      })

      axios.get(`${API}forecast?q=${name}&appid=e86ba166de2e36b28f351cc82f422e7f`)
      .then((response) => {
        Object.assign(response.data, curr.data)
        this.setState({cityList: this.state.cityList.concat(response)}, () => {localStorage.setItem('cityList', JSON.stringify(this.state.cityList))})
        //this.setState({cityList: this.state.cityList.concat(response)})
        //console.log(response);
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
      this.addCity(this.state.city);
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

    this.state.cityList.splice(index,1);
    e.target.parentNode.remove();
    localStorage.setItem('cityList', JSON.stringify(this.state.cityList));
    //this.setState(prevState => ({cityList: prevState.cityList.splice(index,1)}))

    console.log(e.target.parentNode.id);
    //console.log(this.state.cityList[0].data.name);
    console.log(index);
  }


  render() {

    const cities = this.state.cityList.map(input => {

      return(
      <CityComp
        deleteFoo={this.deleteComp}
        name={input.data.name}
        coord={input.data.coord}
        temp={input.data.main.temp}
        pressure={input.data.main.pressure}
        weather={input.data.weather[0].main}
        ThreeDaysWeather={input.data.list}
        wind={input.data.wind.deg}
        scale={this.state.scale}
        key={input.data.id}
      />
    )})

    return (
      <div className='mainContainer'>
        <div className='searchBar'>
          <input
            className='searchInput'
            placeholder='Berlin'
            onChange={this.cityValue}
            onClick={e => e.target.value=''}
            onKeyDown={this.onEnterPress}
          >
          </input>
          <button className='srcBtn' onClick={this.onSearch}>
            <img className='search' src={search} alt='search'></img>
          </button>
          <Link
          to={this.state.routeDir ? '/settings' : '/'}
          className='setBtn'
          >
            <img onClick={this.setRoute} className='setting' src={settings} alt='settings'></img>
          </Link>
        </div>
        <PoseGroup>
          <RouteContainer key='anim'>
            <Switch>
              <Route exact path = '/' component={() => <CityList list={cities} />} key='home'/>
              <Route path='/settings' component={() => <Settings scaleFoo={this.scaleChange} scale={this.state.scale} />} key='settings' />
            </Switch>
          </RouteContainer>
        </PoseGroup>
        {/* <CityList list={cities}/>
        <Settings /> */}
        <SweetAlert
          show={this.state.cityNotFoundErr}
          type='error'
          title='Ups..'
          text='Nie udało nam się znaleźć podanego miasta.'
          onConfirm={() => this.setState({ cityNotFoundErr: 0 })}
        />
        <SweetAlert
          show={this.state.doubleCity}
          type='warning'
          //title='Ups..'
          text='To miasto już znajduje się na liście.'
          onConfirm={() => this.setState({ doubleCity: 0 })}
        />
      </div>
    );
  }
}

export default App;
