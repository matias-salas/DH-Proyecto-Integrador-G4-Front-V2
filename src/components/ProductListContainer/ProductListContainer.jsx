import React, { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import style from "./ProductListContainer.module.css";
import baseUrl from "../../utils/baseUrl.json";

const ProductListContainer = ({
  filteredItems,
  searchCity,
  searchRangeDates,
  filterCategories,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  console.log(filteredItems);

  const startDate =
    searchRangeDates[0] &&
    new Date(searchRangeDates[0]).toISOString().slice(0, 10);

  const endDate =
    searchRangeDates[1] &&
    new Date(searchRangeDates[1]).toISOString().slice(0, 10);

  // console.log('Search', startDate, endDate);

  /* Faltaria arreglar el tema de los filtros para que se puedan reestablecer. También arreglar que si se selecciona una fecha o ciudad ya no funciona el filtro de categoria (no hay desde el back un filtro que acepte las 3 cosas) */
  console.log(searchCity);
  console.log(filteredItems);

  const url =
    filterCategories && !(searchCity || (startDate && endDate))
      ? `${baseUrl.url}/products/category/${filterCategories}`
      : searchCity && startDate && endDate
      ? `${baseUrl.url}/products/cityAndDates/${searchCity.id}/${startDate}/${endDate}`
      : searchCity && !(startDate && endDate)
      ? `${baseUrl.url}/products/transmission/${searchCity.id}`
      : startDate && endDate
      ? `${baseUrl.url}/products/dates/${startDate}/${endDate}`
      : `${baseUrl.url}/products`;

  useEffect(() => {
    if (Object.keys(filteredItems).length === 0) {
      setIsLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log("VERIFICAR : "+data);
          setProducts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setProducts([]);
          setIsLoading(false);
          console.log(err);
        });
    } else if(filteredItems === "zap"){
      setNotFound(true)
    }else {
      setProducts(filteredItems);
      setNotFound(false)
    }
  }, [url, filteredItems]);

  return (
    <div className={style.container}>
      <ProductList products={products} isLoading={isLoading} notFound={notFound} />
    </div>
  );
};

export default ProductListContainer;
