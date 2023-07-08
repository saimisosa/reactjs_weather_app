import React, {useState} from 'react'
import axios from 'axios'

function App() {
    const [data,setData] = useState({});
    const [location, setLocation] = useState('');
    const [isCel, setIsCel] = useState(false);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7853d8573f7abedb6743e01bf837b6e3`

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
        }
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
                onClick={() => setIsCel(true)}>Click for C°
            </button>
            <button
                onClick={() => setIsCel(false)}>Click for F°
            </button>
        </div>
        <div className = "container">
          <div className = "top">
            <div className = "location">
              <p>{data.name}</p>
            </div>
              <div className = "temp">
                  {data.main ? <h1>{isCel ? ((data.main.temp - 32) / 1.8).toFixed(0) : data.main.temp.toFixed()}°{isCel ? 'C' : 'F'}</h1> : null}
              </div>
              <div className = "desc">
                  {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
          </div>

            {data.name !== undefined &&
          <div className = "bottom">
              <div className = "feels">
                  {data.main ? <h2>{isCel ? ((data.main.feels_like - 32) / 1.8).toFixed(0) : data.main.feels_like.toFixed()}°{isCel ? 'C' : 'F'}</h2> : null}
                  <h2>Feels Like</h2>
              </div>

              <div className = "humidity">
                  {data.main ? <h2>{data.main.humidity}%</h2> : null}
                  <h2>Humidity</h2>
              </div>

              <div className = "wind">
                  {data.wind ? <h2>{isCel ? (data.wind.speed * 1.61).toFixed(0) : data.wind.speed.toFixed()} {isCel ? 'KPH' : 'MPH'}</h2> : null}
                  <h2>Winds</h2>
              </div>

          </div>
            }
        </div>
      </div>
  );
}

export default App;
