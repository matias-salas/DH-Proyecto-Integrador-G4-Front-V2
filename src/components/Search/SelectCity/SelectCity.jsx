import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import style from "./SelectCity.module.css";
import baseUrl from "../../../utils/baseUrl.json";

const SelectCity = ({ enviarDato }) => {
  const [prod, setProd] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const handleSearchChange = (e) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);

    const filtered = prod.filter(
      (item) =>
        item.address.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
        item.description.toLowerCase().includes(valorBusqueda.toLowerCase()) ||
        item.name.toString().toLowerCase().includes(valorBusqueda.toLowerCase())
    );

    console.log(filtered);

    if (filtered.length > 0) {
      enviarDato(filtered); // Enviar datos filtrados si hay coincidencias
    } else {
      enviarDato("zap"); // Enviar un arreglo vacío si no hay coincidencias
    }
  };

  useEffect(() => {
    fetch(`${baseUrl.url}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProd(data);
      });
  }, []);

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
