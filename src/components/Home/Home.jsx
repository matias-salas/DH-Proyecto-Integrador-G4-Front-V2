import React, { useState } from "react";
import Categories from "../Categories/Categories";
import ProductListContainer from "../ProductListContainer/ProductListContainer";
import Search from "../Search/Search";
import style from "./Home.module.css";

const Home = () => {
  const [searchCity, setSearchCity] = useState(null);
  const [searchRangeDates, setSearchRangeDates] = useState([null, null]);
  const [categoriesFilter, setCategoriesFilter] = useState(null);
  const [filteredItems, setFilteredItems] = useState({});

  const handleSearch = (citySearch, dateRange) => {
    setSearchCity(citySearch);
    setSearchRangeDates(dateRange);
  };

  //console.log('id category', categoriesFilter);

  const handleFilterCategories = (category) => {
    setCategoriesFilter(category);
  };

  const handleFilterItems = (items) => {
    setFilteredItems(items);
  };
 

  return (
    <div className={style.homeContainer}>
      <Search
        handleSearch={handleSearch}
        handleFilterItems={handleFilterItems}
      />
      <Categories handleFilterCategories={handleFilterCategories} />
      <ProductListContainer
          filteredItems={filteredItems}
          searchCity={searchCity}
          searchRangeDates={searchRangeDates}
          filterCategories={categoriesFilter}
        />
    </div>
  );
};

export default Home;
