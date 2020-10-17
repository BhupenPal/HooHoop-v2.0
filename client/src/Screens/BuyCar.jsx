import React, { Component, useEffect, useState } from "react";
import compose from "recompose/compose";
import { Grid, makeStyles } from "@material-ui/core";
import styles from "../assets/material/Buycar";
import CardComponent from "../Components/CardComponent.jsx";
import SliderComponent from "../Components/sliderComponent.jsx";
import FilterComponent from "../Components/filterComponent.jsx";
import { fetchBuyCar } from "../services/fetchCar";
import useDebounce from "../Hooks/useDebounce.js";
import { Skeleton } from "@material-ui/lab";
import InfiniteScroll from "react-infinite-scroll-component";
import { ca } from "date-fns/esm/locale";
import { addToWishList } from "../services/wishlist";

const useStyles = makeStyles(styles);
const BuyCar = () => {
  const classes = useStyles();
  const [cars, setCars] = useState([]);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedQuery = useDebounce(query, 1000);
  const setWishlist = (VINum,index) => {
    addToWishList(VINum)
    .then(() => {
      console.log(cars[index].LikedBy)
      setCars(cars => {
        cars[index].LikedBy = !cars[index].LikedBy;
        return [...cars];
      })
    });
  }
  useEffect(() => {
    console.log(cars)
  })
  const fetchMoreCars = () => {
    if (debouncedQuery) {
      setLoader(true);
      fetchBuyCar(page, debouncedQuery).then((results) => {
        setLoader(false);
        setHasMore(results.cars.hasNextPage);
        setCars((curCars) => [...curCars, ...results.cars.docs]);
      })
      .catch(err => {
        setLoader(false);
      })
      ;
    } else {
      setCars([]);
    }
  };
  useEffect(() => {
    setCars([]);
    setPage(1);
    fetchMoreCars();
  }, [debouncedQuery]);
  useEffect(() => {
    fetchMoreCars();
  }, [page]);

  const renderSkeleton = () => {
    if (!loader) return null;
    return (
      <Grid item container xs={12} sm={12} style={{ height: "fit-content" }}>
        {[1, 2, 3].map(() => (
          <Grid
            item
            xs={12}
            sm={4}
            className={classes.cardContainer}
            justify="center"
          >
            <Skeleton
              variant="rect"
              width={320}
              height={450}
              style={{ margin: "1rem" }}
            />
          </Grid>
        ))}
      </Grid>
    );
  };
  const renderCars = () => {
    return cars.map((car, index) => <CardComponent key={index} index={index} setWishlist={setWishlist} car={car} />);
  };
  return (
    <Grid
      container
      justify="center"
      component="main"
      className={classes.pageDefault}
    >
      <Grid item container xs={12} sm={3}>
        <FilterComponent setQuery={setQuery} />
      </Grid>
      <Grid item container xs={12} sm={9} style={{ height: "fit-content" }}>
        <InfiniteScroll
          dataLength={cars.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={renderSkeleton()}
        >
          {/* {this.state.items.map((i, index) => (
              <div style={style} key={index}>
                div - #{index}
              </div>
            ))} */}
          <Grid
            item
            container
            xs={12}
            style={{ height: "fit-content" }}
          >
            {renderCars()}
          </Grid>
        </InfiniteScroll>
        {renderSkeleton()}
      </Grid>
    </Grid>
  );
};

export default BuyCar;
