import React, { Component } from 'react';
import sunImg from '../pics/1164891-weather/svg/046-sunny.svg';
import arrowImg from '../pics/arrow-pointing-to-right.svg';
import removeCross from '../pics/delete.svg'
import cloudsImg from '../pics/1164891-weather/svg/025-cloudy.svg';
import rainImg from '../pics/1164891-weather/svg/049-rain.svg'
import snowImg from '../pics/1164891-weather/svg/016-snow.svg'
import fogImg from '../pics/1164891-weather/svg/050-fog.svg'

class CityComp extends Component {

    constructor(props) {
      super(props)
      this.state = {
        expanded: 0
      }
      this.expand = this.expand.bind(this);
      this.delete = this.delete.bind(this);
      this.setWindArrow = this.setWindArrow.bind(this);
      this.coordsConversion = this.coordsConversion.bind(this);
      this.windRouteName = this.windRouteName.bind(this);
      this.temperature = this.temperature.bind(this)
    }

    delete = (e) => {
      this.props.deleteFoo(e);
    }

    expand = () => {
      this.setState(prevState => ({expanded: !prevState.expanded}));
    }

    temperature = () => {
      let temp
      if(!this.props.scale) {
        temp = this.props.temp - 273.3
      } else {
        temp = this.props.temp * (9/5) - 459.67
      }
      return temp
    }

    setWindArrow = () => {
      let deg = this.props.wind
      let arrowStyle = {
        transform: `rotate(${deg-90}deg)`,
      }
      return arrowStyle;
    }

    windRouteName = () => {
      let deg = this.props.wind;
      if(deg < 22.5) return 'S';
      else if(deg < 67.5) return 'SW';
      else if(deg < 112.5) return 'W';
      else if(deg < 157.5) return 'NW';
      else if(deg < 202.5) return 'N';
      else if(deg < 247.5) return 'NE';
      else if(deg < 292.5) return 'E';
      else if(deg < 337.5) return 'SE';
      else return 'S';
    }

    coordsConversion = () => {
      const coords = this.props.coord;
      let coord = {};
      if(coords.lon > 0) {
        let deg, min, sec;
        deg = Math.floor(coords.lon);
        min = Math.floor((coords.lon - deg)*60)
        sec = Math.floor((((coords.lon - deg)*60)-min)*60);
        coord.lon = `${deg}°${min}'${sec}"E`;
      } else {
        let deg, min, sec;
        deg = Math.floor(coords.lon);
        min = Math.floor((coords.lon - deg)*60)
        sec = Math.floor((((coords.lon - deg)*60)-min)*60);
        coord.lon = `${Math.abs(deg)}°${min}'${sec}"W`;
      }
      if(coords.lat > 0) {
        let deg, min, sec;
        deg = Math.floor(coords.lat);
        min = Math.floor((coords.lat - deg)*60)
        sec = Math.floor((((coords.lat - deg)*60)-min)*60);
        coord.lat = `${deg}°${min}'${sec}"N`;
      } else {
        let deg, min, sec;
        deg = Math.floor(coords.lat);
        min = Math.floor((coords.lat - deg)*60)
        sec = Math.floor((((coords.lat - deg)*60)-min)*60);
        coord.lat = `${Math.abs(deg)}°${min}'${sec}"S`;
      }
      return coord;
    }

    render() {

        this.coordsConversion()

        const weatherImgCurr = () => {
          let cloudy = this.props.weather;
          if (cloudy === 'Clear') {
            return sunImg;
          } else if (cloudy === 'Clouds') {
              return cloudsImg
          } else if (cloudy === 'Rain') {
              return rainImg
          } else if (cloudy === 'Snow') {
              return snowImg
          } else if (cloudy === 'Drizzle') {
              return fogImg
          } else return sunImg
        }

        const weatherDescrCurr = () => {
          let cloudy = this.props.weather;
          if (cloudy === 'Clear') {
            return 'Bezchmurnie';
          } else if (cloudy === 'Clouds') {
              return 'Pochmurno'
          } else if (cloudy === 'Rain') {
              return 'Deszcz'
          } else if (cloudy === 'Snow') {
              return 'Śnieg'
          } else if (cloudy === 'Drizzle') {
              return 'Mżawka'
          } else return ''
        }

        const weatherDescrInNextDays = (index) => {
          const date = new Date();
          const hour = date.getHours();
          let cloudy;
          if(hour < 3) cloudy = this.props.ThreeDaysWeather[12+index*8].weather[0].main;
          else if(hour < 6) cloudy = this.props.ThreeDaysWeather[11+index*8].weather[0].main;
          else if(hour < 9) cloudy = this.props.ThreeDaysWeather[10+index*8].weather[0].main;
          else if(hour < 12) cloudy = this.props.ThreeDaysWeather[9+index*8].weather[0].main;
          else if(hour < 15) cloudy = this.props.ThreeDaysWeather[8+index*8].weather[0].main;
          else if(hour < 18) cloudy = this.props.ThreeDaysWeather[7+index*8].weather[0].main;
          else if(hour < 21) cloudy = this.props.ThreeDaysWeather[6+index*8].weather[0].main;
          else if(hour < 24) cloudy = this.props.ThreeDaysWeather[5+index*8].weather[0].main;

          if (cloudy === 'Clear') {
            return sunImg;
          } else if (cloudy === 'Clouds') {
              return cloudsImg
          } else if (cloudy === 'Rain') {
              return rainImg
          } else if (cloudy === 'Snow') {
              return snowImg
          } else if (cloudy === 'Drizzle') {
              return fogImg
          } else return sunImg
        }

        const weatherInNextDays = (index) => {
          const date = new Date();
          const hour = date.getHours();
          if(hour < 3) return Math.round(this.props.ThreeDaysWeather[12+index*8].main.temp-273.3);
          else if(hour < 6)return Math.round(this.props.ThreeDaysWeather[11+index*8].main.temp-273.3);
          else if(hour < 9)return Math.round(this.props.ThreeDaysWeather[10+index*8].main.temp-273.3);
          else if(hour < 12)return Math.round(this.props.ThreeDaysWeather[9+index*8].main.temp-273.3);
          else if(hour < 15)return Math.round(this.props.ThreeDaysWeather[8+index*8].main.temp-273.3);
          else if(hour < 18)return Math.round(this.props.ThreeDaysWeather[7+index*8].main.temp-273.3);
          else if(hour < 21)return Math.round(this.props.ThreeDaysWeather[6+index*8].main.temp-273.3);
          else if(hour < 24)return Math.round(this.props.ThreeDaysWeather[5+index*8].main.temp-273.3);

          console.log(date.getHours());
        }

        const nextDaysDate = (index) => {
          const date = new Date(new Date().getTime() + index*24*60*60*1000);
          const day = date.getDate();
          const month = date.getMonth()+1;
          if(month<10) return day+'.0'+month;
          return day+'.'+month;
        }



        return(
            <div
            id={this.props.name}
            className={this.state.expanded ? 'contentContainer1' : 'contentContainer2'}
            onClick = {this.expand}

            >
              <p className='city'>{this.props.name}</p>
              <div className='coords'>
                <p>{this.coordsConversion().lat}</p>
                <p>{this.coordsConversion().lon}</p></div>
              <img className='weather' src={weatherImgCurr()} alt='weatherPic'></img>
              <div className='temperature'>
                <div>{Math.round(this.props.scale ? this.props.temp * (9/5) - 459.67 : this.props.temp - 273.3)}{this.props.scale ? '°F' : '°C'}</div>
                <div>{weatherDescrCurr()}</div>
              </div>
              <div className='wind'>
                <div>
                  <p>{this.windRouteName()}</p>
                  <img className = 'windArrow' style={this.setWindArrow()} src={arrowImg} alt='windArrow'></img>
                </div>
                <p className='bar'>{this.props.pressure}hPa</p>
              </div>
              <div className='next3Days'>
                <div>
                  <div className='date3'>{nextDaysDate(1)}</div>
                  <img className='weather3' src={weatherDescrInNextDays(0)} alt='weather'></img>
                  <div className='temp3'>{weatherInNextDays(0)}{this.props.scale ? '°F' : '°C'}</div>
                </div>
                <div>
                  <div className='date3'>{nextDaysDate(2)}</div>
                  <img className='weather3' src={weatherDescrInNextDays(1)} alt='weather'></img>
                  <div className='temp3'>{weatherInNextDays(1)}{this.props.scale ? '°F' : '°C'}</div>
                </div>
                <div>
                  <div className='date3'>{nextDaysDate(3)}</div>
                  <img className='weather3' src={weatherDescrInNextDays(2)} alt='weather'></img>
                  <div className='temp3'>{weatherInNextDays(2)}{this.props.scale ? '°F' : '°C'}</div>
                </div>
              </div>
              <img onClick = {this.delete} className='removeCross' src={removeCross} alt='remove'></img>
            </div>
        );
    }
}

export default CityComp;