// Dependecies
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import FetchFavs from "../../services/FetchFavs";
import CardComponent from "../../Components/Cards/CardComponent.jsx";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({}));

const Favourites = (props) => {
  const classes = useStyles();

  const [favourites, setFavourites] = useState([]);
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    setListLoader(true);
    FetchFavs()
      .then((Favs) => {
        setListLoader(false);
        setFavourites(Favs);
      })
      .catch(() => {
        setListLoader(false);
      });
  }, []);

  const renderSkeleton = () => {
    if (listLoader) {
      return (
        <>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            
              <Skeleton
                variant="rect"
                width={300}
                height={450}
                style={{ margin: "1rem" }}
              />
          ))}
        </>
      );
    }
  };
  return (
    <Grid container height style={{ height: "fit-content" }} justify="center">
        {renderSkeleton()}
      {favourites.map((car) => {
        return (
          <CardComponent
            key={car.VINum}
            index={car.VINum}
            setWishlist={favourites}
            car={car}
            showLiked={true}
          />
        );
      })}
    </Grid>
  );
};

export default Favourites;
