import React, { useContext, useState } from "react";
import style from "./Search.module.css";
import Calendar from "./Calendar/Calendar";
import SelectCity from "./SelectCity/SelectCity";
import { dateRangeContext } from "../../context/DateRangeContext";

const Search = ({ handleSearch  }) => {
  const { rangeDate } = useContext(dateRangeContext);
  const [items, setItems] = useState(null);

  const obtenerDato = (items) => {
    setItems(items);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(items, rangeDate);
  };

  return (
    <div className={style.searchContainer}>
      <h1 className={style.searchTitle}>
        Buscá el mejor transporte para tu viaje...
      </h1>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <SelectCity enviarDato={obtenerDato} />
        <Calendar />
        <button className={`btn btn2 ${style.searchBtn}`}>Buscar</button>
      </form>
    </div>
  );
};

export default Search;
