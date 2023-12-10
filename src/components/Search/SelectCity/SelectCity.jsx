import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import style from "./SelectCity.module.css";
import baseUrl from "../../../utils/baseUrl.json";

const SelectCity = ({ enviarDato }) => {
  const [prod, setProd] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearchChange = (e) => {
    setBusqueda(e.target.value);
    enviarDato(filteredItems);
  };

  useEffect(() => {
    fetch(`${baseUrl.url}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProd(data);
      });

    const filtered = prod.filter((item) => {
      return (
        item.address.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.description.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.name.toString().toLowerCase().includes(busqueda.toLowerCase())
      );
    });
    setFilteredItems(filtered);
  }, [busqueda, prod]);

  return (
    <div className={style.selectBox}>
      <div className={style.dropDownHeader}>
        <div className={style.selectContent}>
          <FontAwesomeIcon icon={faCar} />
          <input
            type="text"
            value={busqueda}
            onChange={handleSearchChange}
            placeholder="Buscar por marca, modelo, año, tipo y mucho más!"
            className={style.inputSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectCity;
