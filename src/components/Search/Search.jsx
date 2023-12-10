import React, { useContext, useState } from 'react';
import style from './Search.module.css';
import Calendar from './Calendar/Calendar';
import SelectCity from './SelectCity/SelectCity';
import { dateRangeContext } from '../../context/DateRangeContext';

const Search = ({ handleSearch }) => {
  const [transmission, setCity] = useState(null);
  const { rangeDate } = useContext(dateRangeContext);

  console.log(rangeDate);

  const getCity = (valueCity) => {
    setCity(valueCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(transmission, rangeDate);
  };

  return (
    <div className={style.searchContainer}>
      <h1 className={style.searchTitle}>
        Buscá el mejor tranporte para tu viaje...
      </h1>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <SelectCity getCity={getCity} />
        <Calendar />
        <button className={`btn btn2 ${style.searchBtn}`}>Buscar</button>
      </form>
    </div>
  );
};

export default Search;
