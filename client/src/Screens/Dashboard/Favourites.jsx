// Dependecies
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import FetchFavs from '../../services/FetchFavs'

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
        <div>
            Hello
        </div>
    )
}

export default Favourites
