import React from "react";
import Product from "../Product/Product";
import Spinner from "../Spinner/Spinner";
import style from "./ProductList.module.css";
import ProductNotFound from "../Product/ProductNotFound";

const ProductList = ({ products, isLoading, notFound }) => {
  //console.log(products);

  // sort products by  average_score
  console.log(products);

  products.sort((a, b) => {
    return b.average_score - a.average_score;
  });

  return (
    <>
      {notFound ? ( // Verifica si no se encontraron productos
        <ProductNotFound />
      ) : (
        <div className={style.container}>
          <h2 className={style.recommendations}>Recomendaciones</h2>
          {isLoading ? (
            <div style={{ alignSelf: "center" }}>
              <Spinner style={{ alignSelf: "center" }} />
            </div>
          ) : (
            <>
              {products.length === 0 ? (
                /* <p className={style.msgNoProducts}>
              Lamentablemente no hay productos para los filtros seleccionados.
            </p> */ <ProductNotFound />
              ) : (
                products.map((product) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    imgUrl={product.image}
                    category={product.category}
                    title={product.name}
                    description={product.description}
                    location={product.transmission}
                    address={product.address}
                    attributes={product.attributes}
                    latitude={product.latitude}
                    longitude={product.longitude}
                    policiesSite={product.policiesSite}
                    policiesSecurityAndHealth={
                      product.policiesSecurityAndHealth
                    }
                    policiesCancellation={product.policiesCancellation}
                    averageScore={product.average_score}
                    availableDates={[
                      "2024-01-13",
                      "2023-11-29",
                      "2024-01-01",
                      "2023-11-24",
                      "2024-01-09",
                      "2024-01-13",
                      "2024-01-13",
                      "2024-01-14",
                      "2024-01-16",
                      "2024-01-05",
                      "2024-01-02",
                      "2024-01-02",
                      "2023-11-24",
                      "2023-11-28",
                      "2024-01-04",
                      "2024-01-18",
                      "2023-11-28",
                      "2024-01-06",
                      "2024-01-23",
                      "2024-01-20",
                      "2024-01-03",
                      "2023-11-26",
                      "2024-01-09",
                      "2024-01-03",
                      "2024-01-16",
                      "2024-01-03",
                      "2024-01-08",
                      "2023-11-28",
                      "2023-11-28",
                      "2024-01-08",
                      "2024-01-21",
                      "2024-01-06",
                      "2024-01-09",
                      "2024-01-04",
                      "2023-11-26",
                      "2024-01-15",
                      "2024-01-07",
                    ]}
                  />
                ))
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductList;
