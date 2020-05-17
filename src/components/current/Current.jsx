import React from "react";

class Current extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    // console.log("current render");
    const {
      city,
      country,
      icon,
      main,
      temp,
      humidity,
      pressure,
      wind,
      cloudiness,
    } = this.props.data;
    return (
      <div className='current'>
        <div className='current-left container'>
          <h3 className='current__location'>
            {city}, {country}
          </h3>
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            className='current__icon'
            alt=''
          />
          <h2>{temp.toFixed(0)}°C</h2>
          <p className='current__desc'>{main}</p>
        </div>
        <div className='current-right container'>
          <div className='current-row  current__wind'>Wind: {wind}m/s</div>
          <div className='current-row current__humidity'>Cloudiness: {cloudiness}%</div>
          <div className='current-row current__humidity'>Humidity: {humidity}%</div>
          <div className='current-row current__humidity'>Presure: {pressure} hpa</div>
        </div>
      </div>
    );
  }
}

export default Current;
