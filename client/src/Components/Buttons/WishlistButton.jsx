import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { addToWishList } from "../../services/wishlist";

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
  const setWishlist = () => {
    addToWishList(VINum).then(() => {
      setLike((like) => !like);
    });
  };
  useEffect(() => {
    setLike(LikedBy)
  }, [LikedBy])
  return (
    <Avatar onClick={() => setWishlist()} className={classes.favoriteIcon}>
      <IconButton>
        {isLiked === true ? (
          <FavoriteIcon className={classes.heartIcon} />
        ) : (
          <FavoriteBorderIcon className={classes.heartIcon} />
        )}
      </IconButton>
    </Avatar>
  );
}

export default WishlistButton;
