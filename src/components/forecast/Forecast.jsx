import React from "react";
import ForecastItem from "./ForecastItem";
const Forecast = (props) => {
  return (
    <div className='forecast'>
      {props.data.map((element) => (
        <ForecastItem
          key={element.dt}
          dt={element.dt_txt}
          icon={element.weather[0].icon}
          temp={element.main.temp}
        />
      ))}
    </div>
  );
};

export default Forecast;
