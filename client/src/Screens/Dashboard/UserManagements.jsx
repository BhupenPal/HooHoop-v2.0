import { makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Table from "../../Components/Table.jsx"
import { Skeleton } from "@material-ui/lab"
import { deleteUser, getUsers } from "../../services/userManagement.js"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined"
import DeleteDialog from "../../Components/Modals/DeleteListingModal.jsx"
import EditUserModel from "../../Components/Modals/EditUserModel.jsx"
import SortBy from "../../Components/Inputs/SortBy.jsx"

const useStyles = makeStyles((theme) => ({
	vehicle: {
		display: "flex",
		alignItems: "center",
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

const sortingOptions = ["Created At", "Name", "Email"]

function UserManagement(props) {
	const classes = useStyles()
	const [allUsers, setAllUsers] = useState([])
	const [listLoader, setListLoader] = useState(false)
	const [currentUserID, setUserID] = useState("")
	const [currentUser, setUser] = useState(null)
	const [openEditDialog, setEditDialog] = useState(false)
	const [openDialog, setDialog] = useState(false)

	const [sortBy, setSortBy] = useState("Created At")

	const handleChange = (e) => {
		setSortBy(e.target.value)
	}

	useEffect(() => {
		setListLoader(true)
		getUsers()
			.then((listing) => {
				setListLoader(false)
				setAllUsers(listing)
			})
			.catch(() => {
				setListLoader(false)
			})
	}, [])

	const header = [
		{
			title: "S No.",
			key: "sno",
		},
		{
			title: "Name",
			key: "FullName",
		},
		{
			title: "Email",
			key: "Email",
		},
		{
			title: "Phone Number",
			key: "Phone",
		},

		{
			title: "Status",
			key: "Status",
		},
		{
			title: "Manage",
			key: "manage",
		},
	]

	const showEditDialog = (user) => {
		setEditDialog(true)
		setUser(user)
	}

	const closeEditDialog = () => {
		setEditDialog(false)
		setUser(null)
	}

	const showDeleteDialog = (UserID) => {
		setDialog(true)
		setUserID(UserID)
	}

	const closeDialog = () => {
		setDialog(false)
		setUserID("")
	}

	const deleteUserFromList = (UserID) => {
		setAllUsers((users) => {
			return users.filter((user) => user._id !== UserID)
		})
	}

	const handleDeleteUser = (userId) => {
		if (userId && userId.length > 0) {
			deleteUser(userId).then((isSuccess) => {
				if (isSuccess) {
					deleteUserFromList(userId)
				}
				closeDialog()
			})
		}
	}

	const makeData = (rows) => {
		return rows.map((row, index) => ({
			sno: index + 1,
			FullName: row.FirstName + " " + row.LastName,
			Email: row.Email,
			Phone: row.Phone,
			Status: row.Status,
			manage: renderOptions(index, row),
		}))
	}

	const renderOptions = (index, user) => {
		return (
			<div>
				<span className={classes.options}>

					<InfoOutlinedIcon />
				</span>
				<span className={classes.options} onClick={() => showEditDialog(user)}>
					<EditOutlinedIcon />
				</span>
				<span
					className={classes.options}
					onClick={() => showDeleteDialog(user._id)}
				>
					<DeleteOutlineOutlinedIcon />
				</span>
			</div>
		)
	}

	return (
		<div className="dashboard">
			<div className="dashboard__header">
				<h2 className={"dashboard__heading"}>All Users</h2>
				<p className={"dashboard__heading"}>{allUsers.length} Total</p>
				<div className={"dashboard__heading dashboard__sort"}>
					<SortBy options={sortingOptions} handleChange={handleChange} sortBy={sortBy} />
				</div>
			</div>

			<EditUserModel
				open={openEditDialog}
				user={currentUser}
				onClose={closeEditDialog}
			/>
			<DeleteDialog
				open={openDialog}
				message={`Are you sure you want to permanently remove this user?`}
				handleConfirm={() => handleDeleteUser(currentUserID)}
				deleteUserFromList={deleteUserFromList}
				VINum={currentUserID}
				onClose={closeDialog}
			/>
			<Table header={header} rows={makeData(allUsers)} />
			{
				listLoader ? (
					<Skeleton variant="rect" width={"100%"} height={60} />
				) : null
			}
		</div>
	)
}

export default UserManagement
