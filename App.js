import React, {useState} from 'react'
import axios from 'axios'

function App() {
    const [data,setData] = useState({});
    const [location, setLocation] = useState('');
    const [degUnit, setDegUnit] = useState('F');
    const [speedUnit, setSpeedUnit] = useState('MPH');

    // const deg = ["F", "C"];
    // const speed = ["MPH", "KMPH"];
    // let speedUnit = speed[0];
    // let degUnit = deg[0];

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7853d8573f7abedb6743e01bf837b6e3`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            // setLocation('')
        }
    }
    const changeUnitsC = () => {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7853d8573f7abedb6743e01bf837b6e3`;
        axios.get(url).then((response) => {
            setData(response.data)
            setDegUnit('C');
            setSpeedUnit('KPH');
            // degUnit = deg[1];
            // speedUnit = speed[1];
            console.log(response.data)
            console.log(degUnit, speedUnit);
        })
    }

    const changeUnitsF = () => {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7853d8573f7abedb6743e01bf837b6e3`;
        axios.get(url).then((response) => {
            setData(response.data)
            setDegUnit('F');
            setSpeedUnit('MPH');
            // degUnit = deg[0];
            // speedUnit = speed[0];
            console.log(degUnit, speedUnit);
            console.log(response.data)
        })
    }


  return (
      <div className = "App">
        <div className="search">
            <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyDown={searchLocation}
                placeholder="Enter Location"
                type="text"/>
        </div>
        <div className = "toggle-units">
            <button
                onClick={changeUnitsC}>Click for C°
            </button>
            <button
                onClick={changeUnitsF}>Click for F°
            </button>
        </div>
        <div className = "container">
          <div className = "top">
            <div className = "location">
              <p>{data.name}</p>
            </div>
              <div className = "temp">
                  {data.main ? <h1>{data.main.temp.toFixed()}°{degUnit}</h1> : null}
              </div>
              <div className = "desc">
                  {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
          </div>

            {data.name !== undefined &&
          <div className = "bottom">
              <div className = "feels">
                  {data.main ? <h2>{data.main.feels_like.toFixed()}°{degUnit}</h2> : null}
                  <h2>Feels Like</h2>
              </div>

              <div className = "humidity">
                  {data.main ? <h2>{data.main.humidity}%</h2> : null}
                  <h2>Humidity</h2>
              </div>

              <div className = "wind">
                  {data.wind ? <h2>{data.wind.speed.toFixed()} {speedUnit}</h2> : null}
                  <h2>Winds</h2>
              </div>

          </div>
            }
        </div>
      </div>
  );
}

export default App;
