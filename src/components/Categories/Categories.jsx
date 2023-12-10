import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import baseUrl from "../../utils/baseUrl.json";
import CategorieSkeleton from "../Skeletons/CategorieSkeleton/CategorieSkeleton";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useMediaQuery } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Categories = ({ handleFilterCategories }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(categories);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl.url}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {isMobile ? (
        <MobileCategories
          theme={theme}
          isLoading={isLoading}
          categories={categories}
          handleFilterCategories={handleFilterCategories}
        />
      ) : (
        <DesktopCategories
          isLoading={isLoading}
          categories={categories}
          handleFilterCategories={handleFilterCategories}
        />
      )}
    </div>
  );
};

const MobileCategories = ({
  isLoading,
  categories,
  handleFilterCategories,
  theme
}) => {
  // MATERIAL UI
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = categories.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={style.categoriesContainer}>
      <h2>Buscar por tipo de vehículo</h2>
      <div className={style.categoriesList}>
        {isLoading ? (
          <>
            <CategorieSkeleton />
          </>
        ) : (
          <>
            {
              <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                <Paper
                  square
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    pl: 2,
                    bgcolor: "background.default",
                  }}
                >
                  <Typography>{categories[activeStep].name}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {categories.map((category, index) => (
                    <div key={category.name}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: 255,
                            display: "block",
                            maxWidth: 400,
                            overflow: "hidden",
                            width: "100%",
                          }}
                          src={category.url}
                          alt={category.name}
                          onClick={() => handleFilterCategories(category.id)}
                        />
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </Box>
            }
          </>
        )}
      </div>
    </div>
  );
};

const DesktopCategories = ({
  isLoading,
  categories,
  handleFilterCategories,
}) => {
  return (
    <div className={style.categoriesContainer}>
      <h2>Buscar por tipo de vehículo</h2>
      <div className={style.categoriesList}>
        {isLoading ? (
          <>
            <CategorieSkeleton />
            <CategorieSkeleton />
            <CategorieSkeleton />
            <CategorieSkeleton />
          </>
        ) : (
          <>
            {categories.map((category) => (
              <div
                className={style.categoryCard}
                key={category.id}
                onClick={() => handleFilterCategories(category.id)}
              >
                <img
                  className={style.categoryImage}
                  src={category.url}
                  alt={category.name}
                />
                <div className={style.containerDescription}>
                  <p>{category.name}</p>
                  <p className={style.categoryDescription}>
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
