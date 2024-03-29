import { makeStyles } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import moment from "moment"
import React, { useState, Fragment } from "react"
import { deleteListing } from "../services/listings.js"
import { getSmallThumbnailLink } from "../utils/getImagesUrl.js"
import ListingOptions from "./Buttons/ListingOptions.jsx"
import DeleteDialog from "./Modals/DeleteListingModal.jsx"
import EditCarModal from "./Modals/EditCarModal.jsx"
import CustomTable from "./Table.jsx"

const useStyles = makeStyles((theme) => ({
	vehicle: {
		display: "flex",
		alignItems: "center",
		["& a"]: {
			display: "flex",
		}
	},
	vehicleImg: {
		borderRadius: "200rem",
		marginRight: "0.5rem",
	},
	options: {
		color: "#999999",
		cursor: "pointer",
		margin: "0 0.1rem",
	}
}))

function Listing({ listings, listLoader, setListing }) {
	const classes = useStyles()
	const [currentVINum, setVINum] = useState("")
	const [currentCar, setCar] = useState(null)
	const [openEditDialog, setEditDialog] = useState(false)
	const [openDialog, setDialog] = useState(false)

	const header = [
		{
			title: "S No.",
			key: "sno",
		},
		{
			title: "Date",
			key: "date",
		},
		{
			title: "Vehicle",
			key: "Make",
		},
		{
			title: "Views",
			key: "ViewsCount",
		},

		{
			title: "Unique ID",
			key: "VINum",
		},

		{
			title: "Price",
			key: "Price",
		},
		{
			title: "Leads",
			key: "LeadsGenerated"
		},
		{
			title: "Manage",
			key: "manage",
		},
	]

	const makeData = (rows) => {
		return rows.map((row, index) => ({
			sno: index + 1,
			date: moment(row.createdAt).format('ll'),
			Make: <div>{renderVehicle({ VINum: row.VINum, name: row.Make })}</div>,
			ViewsCount: row.ViewsCount,
			VINum: <a target="_blank" style={{ color: "black" }} href={`/car/${row.VINum}`}>{row.VINum}</a>,
			Price: row.Price,
			LeadsGenerated: row.LeadsGenerated,
			manage: renderOptions(index, row),
		}))
	}

	const editCar = (VINum, info) => {
		setListing((cars) => {
			return cars.map((car) => {
				if (car.VINum === VINum) {
					return { ...car, ...info }
				}
				return car
			})
		})
	}

	const showEditDialog = (car) => {
		setEditDialog(true)
		setCar(car)
	}

	const closeEditDialog = () => {
		setEditDialog(false)
		setCar(null)
	}

	const showDialog = (VINum) => {
		setDialog(true)
		setVINum(VINum)
	}

	const closeDialog = () => {
		setDialog(false)
		setVINum("")
	}

	const deleteCarFromList = (VINum) => {
		setListing((cars) => {
			return cars.filter((car) => car.VINum !== VINum)
		})
	}

	const handleDeleteCar = (VINum) => {
		if (VINum && VINum.length > 0) {
			deleteListing(VINum).then((isSuccess) => {
				if (isSuccess) {
					deleteCarFromList(VINum)
				}
				closeDialog()
			})
		}
	}

	const renderOptions = (index, car) => {
		return (
			<ListingOptions
				car={car}
				showDeleteDialog={showDialog}
				showEditDialog={showEditDialog}
				classes={classes}
			/>
		)
	}

	const renderVehicle = ({ VINum, name }) => {
		return (
			<div className={classes.vehicle}>
				<a target="_blank" href={`/car/${VINum}`}> <img
					className={classes.vehicleImg}
					height={"30px"}
					src={getSmallThumbnailLink(VINum)}
				/></a>{" "}
				{name}
			</div>
		)
	}

	return (
		<Fragment>
			<EditCarModal
				open={openEditDialog}
				car={currentCar}
				onClose={closeEditDialog}
				editCar={editCar}
			/>
			<DeleteDialog
				open={openDialog}
				message={`Are you sure you want to permanently remove car with VIN number ${currentVINum}?`}
				handleConfirm={() => handleDeleteCar(currentVINum)}
				deleteCarFromList={deleteCarFromList}
				VINum={currentVINum}
				onClose={closeDialog}
			/>
			<CustomTable header={header} rows={makeData(listings)} />
			{
				listLoader ? (
					<Skeleton variant="rect" width={"100%"} height={60} />
				) : null
			}
		</Fragment>
	)
}

export default Listing
