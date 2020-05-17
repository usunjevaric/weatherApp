import React from "react";

const ForecastItem = (props) => {
  const date = new Date(props.dt);
  const day = date.toString().split(" ")[0];
  return (
    <div className='forecast__item'>
      <div className='forecast__item__icon'>
        <p className='forecast__item__day'>{day}</p>
        <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt='' />
      </div>
      <div className='forecast__item__temp'>{props.temp.toFixed(0)}°C</div>
    </div>
  );
};
export default ForecastItem;
