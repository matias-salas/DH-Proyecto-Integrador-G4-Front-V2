import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fas,
  faGear,
  faHeart,
  faCar,  
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const Product = ({
  id,
  imgUrl,
  category,
  title,
  description,
  location,
  attributes,
  averageScore,
  address,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = () => {
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
  };

  const textScore = (rating) => {
    let text =
      rating >= 0 && rating <= 2.5
        ? 'Muy Malo'
        : rating >= 2.6 && rating <= 5
        ? 'Malo'
        : rating >= 5.1 && rating <= 6.5
        ? 'Regular'
        : rating >= 6.6 && rating <= 8
        ? 'Bueno'
        : 'Muy bueno';
    return text;
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.productImageContainer}>
        <FontAwesomeIcon
          onClick={handleAddFavorite}
          className={style.productFavorite}
          icon={!isFavorite ? faHeartRegular : faHeart}
        />
        <img className={style.productImage} src={imgUrl[0]?.url} alt={title} />
      </div>
      <div className={style.cardDetails}>
        <div className={style.row1}>
          <div className={style.productInitialContainer}>
            <div className={style.productCategoryContainer}>
              <div className={style.productCategorySubContainer}>
                <FontAwesomeIcon className={style.productStars} icon={faCar} />
                <p className={style.productCategory}>{category.name}</p>
              </div>

              <div className={style.productCategorySubContainer}>
                <FontAwesomeIcon className={style.productStars} icon={faGear} />
                <p className={style.productCategory}>{location.name}</p>
              </div>
              
            </div>
            <h5 className={style.productTitle}>$ {title}</h5>
          </div>
          {/* Score */}
          <div className={style.productScore}>
            <span className={style.scoreNumber}>
              {averageScore ? averageScore : 1}
            </span>
            <p className={style.scoreText}>{textScore(averageScore)}</p>
          </div>
        </div>

        <div className={style.productInformation}>
          <div className={style.propertyHighlights}>
            {/* {attributes?.map((attribute) => (
              <FontAwesomeIcon icon={fas[attribute?.icon]} key={attribute.id} />
            ))} */}
            {address}
          </div>
        </div>

        <p className={style.productDescription}>{description}</p>
        <Link to={`/products/${id}`} className={`btn btn2 w-100`}>
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default Product;
