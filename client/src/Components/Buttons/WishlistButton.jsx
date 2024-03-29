import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { addToWishList } from "../../services/wishlist";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginModel from "../Modals/LoginModel.jsx";
import { showLoginModel } from "../../utils/showLoginModel";

const useStyles = makeStyles(theme => ({
    favoriteIcon: {
        backgroundColor: "transparent",
        border: "1px solid #E85513",
        marginLeft: "2rem",
        '&:hover': {
            backgroundColor: '#E8551310'
        }
    },
    heartIcon: {
        color: "#E85513",
    },
}))

function WishlistButton({ VINum,LikedBy }) {
    const classes = useStyles();
  const [isLiked, setLike] = useState(LikedBy);
  const {isAuthenticated} = useSelector(state => state.auth)
 
  const setWishlist = () => {
    if(isAuthenticated){
      addToWishList(VINum).then(() => {
        setLike((like) => !like);
      });
    }else{
      showLoginModel();
    }
  };
  useEffect(() => {
    if(!isAuthenticated){
      setLike(false);
    }
  },[isAuthenticated])
  useEffect(() => {
    setLike(LikedBy)
  }, [LikedBy])
  return (
    <>
    <LoginModel/>

    <Avatar onClick={setWishlist} className={classes.favoriteIcon}>
      <IconButton>
        {isLiked === true ? (
          <FavoriteIcon className={classes.heartIcon} />
        ) : (
          <FavoriteBorderIcon className={classes.heartIcon} />
        )}
      </IconButton>
    </Avatar>
    </>
  );
}

export default WishlistButton;
