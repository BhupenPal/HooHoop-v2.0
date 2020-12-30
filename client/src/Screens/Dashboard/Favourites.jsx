// Dependecies
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import FetchFavs from '../../services/FetchFavs'
import CardComponent from '../../Components/Cards/CardComponent.jsx'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({

}))

const Favourites = (props) => {
    const classes = useStyles()

    const [favourites, setFavourites] = useState([])
    const [listLoader, setListLoader] = useState(false)

    useEffect(() => {
        FetchFavs()
            .then(Favs => {
                setListLoader(false)
                setFavourites(Favs)
            })
            .catch(() => {
                setListLoader(false)
            })
    }, [])

    return (
        <Grid container height style={{ height: "fit-content" }} justify="center">
            {
                favourites.map(car => {
                    return (
                        <CardComponent
                            key={car.VINum}
                            index={car.VINum}
                            setWishlist={favourites}
                            car={car}
                            showLiked={true}
                        />
                    )
                })
            }
        </Grid>
    )
}

export default Favourites
