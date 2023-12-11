import style from "./Product.module.css";

const ProductNotFound = () => {
  return (
    <div className={style.cardContainer}>
      <div className={style.productImageContainer}>
        <img
          className={style.productImage}
          src="https://images.kavak.services/ar/assets/images/catalogue/svg/search-results-all.svg"
          alt="not found"
        />
      </div>
      <div className={style.cardDetails}>
        <p className={style.propertyHighlights}>
          No encontramos resultados para tu búsqueda.
        </p>
        <div className={style.productCategory} >
          Ajustá los filtros y encontrá otras opciones.
        </div>
      </div>
    </div>
  );
};

export default ProductNotFound;
