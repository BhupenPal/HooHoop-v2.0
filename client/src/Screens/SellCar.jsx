import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import styles from "../assets/material/SellForm";
import SellBackCar from "../assets/img/SellCar/sellbackground.png";
import ImageIcon from "../assets/img/svgs/Image.svg";
import EditIcon from "../assets/img/svgs/edit-3.svg";
import HappyCarIcon from "../assets/img/svgs/Car.svg";
import FileTextIcon from "../assets/img/svgs/file-text.svg";
import "../assets/css/sellcarpage.scss";
import SelectBox from "../Components/SelectBox.jsx";
import axios from "axios";
import MakeModel from "../assets/data/MakeModel";
import RichTextEditor from "../Components/RichTextEditor.jsx";
import FileInput from "../Components/FileInput.jsx";
import { postSellCar } from "../services/sellCar.js";
import ErrorSnackBar from "../Components/OpenSnackBar.jsx";
import { DropzoneDialog } from "material-ui-dropzone";
import MultiFileInput from "../Components/MultiFileInput.jsx";

const SellCar = (props) => {
  const { classes } = props;
  let dataarray = [];
  const bodyTypes = [
    "Convertible",
    "Hatchback",
    "Heavy Van",
    "Light Van",
    "Station Wagon",
    "Utility",
    "Other",
  ];
  const transmissionTypes = [
    "Don't Know",
    "Automatic",
    "Manual",
    "Triptonic",
    "CVT",
  ];
  const fuelTypes = ["Don't Know", "Petrol", "Diesel", "Electric", "Hybrid"];

  const doorCounts = [1, 2, 3, 4, 5, 6];
  const [showErrors, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setSuccess] = useState(false);
  const [showSnackBar, setSnackBar] = useState(false);
  const [preview, setPreview] = useState({
    InteriorFront: null,
    InteriorRear: null,
    InteriorMiddle: null,
  });
  const [dataobject, changedata] = useState({
    Make: "",
    Model: "",
    ModelYear: new Date().getFullYear(),
    Price: 0,
    MinPrice: 0,
    BodyType: "",
    Transmission: "",
    EngineSize: 0,
    FuelType: "",
    Color: "",
    Description: "",
    KMsDriven: 0,
    VINum: "",
    DoorCount: 0,
    SeatCount: 0,
    ModelDetail: "",
    REGExpiry: new Date(),
    WOFExpiry: new Date(),
    InteriorFront: null,
    InteriorRear: null,
    InteriorMiddle: null,
    ExteriorSlider: null,
    ExteriorVideo: null,
  });
  const handleVideoUpload = (e) => {

    const files = e.target.files;
    console.log(e,files)
    changedata({ ...dataobject, ExteriorVideo: files });
    var video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      var duration = video.duration;
      if(duration > 40){
        console.log("hi")
        changedata({ ...dataobject, ExteriorVideo: null});
        setError("Video must be less than 40 sec");
        setSnackBar(true);
        setShowError(true);
      }
      console.log(duration)
    };

    video.src = URL.createObjectURL(files[0]);
  };
  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
    setPreview({
      ...preview,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
    changedata({ ...dataobject, [e.target.name]: e.target.files });
  };
  const handleMultiFileUpload = (files) => {
    console.log(files);
    changedata({ ...dataobject, ExteriorSlider: files });
  };
  const handleChange = (e) => {
    //   console.log(e.target);
    changedata({ ...dataobject, [e.target.name]: e.target.value });
  };

  const getLast20Years = () => {
    let years = [];
    for (
      let i = new Date().getFullYear() - 20;
      i <= new Date().getFullYear();
      i++
    ) {
      years.unshift(i);
    }
    return years;
  };

  const handleEditorChange = (content, editor) => {
    changedata({ ...dataobject, Description: content });
  };
  useEffect(() => {
    console.log(dataobject);
  }, [dataobject]);

  const FetchJam = () => {
    var platenum = document.getElementsByName("platenum")[0].value;
    axios
      .get(`/api/user/car-data-fetch/${platenum}`)
      .then((res) => {
        console.log(res.data);
        document.querySelector("#Make").textContent = res.data.make;
        document.querySelector("#ModelYear").textContent =
          res.data.year_of_manufacture;
        document.querySelector("#BodyStyle").textContent = res.data.body_style;
        document.querySelector("#Model").textContent = res.data.model;
        document.querySelector("#NoOweners").textContent =
          res.data.number_of_owners;
        document.querySelector("#Color").textContent = res.data.main_colour;
        document.querySelector("#FuelType").textContent = res.data.fuel_type;
        document.querySelector("#VIN").textContent = res.data.vin;
        document.querySelector("#EngineNo").textContent = res.data.engine_no;
        document.querySelector("#PlateNumber").textContent = res.data.plate;
        document.querySelector("#Chassis").textContent = res.data.chassis;
        document.querySelector("#Seats").textContent = res.data.no_of_seats;
        console.log(res.data);
        dataarray.push(res.data);
        changedata({
          ...dataobject,
          Make: res.data.make,
          Model: res.data.model,
          ModelYear: res.data.year_of_manufacture,
          BodyType: res.data.body_style,
          Transmission: res.data.transmission,
          EngineSize: res.data.cc_rating,
          FuelType: res.data.fuel_type,
          Kilometers: res.data.latest_odometer_reading,
          Color: res.data.main_colour,
          Plate: res.data.plate,
          Seats: res.data.no_of_seats,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const validateForm = () => {
    if (dataobject.Price < 1) {
      setError("Price is Required");
      setSnackBar(true);
      setShowError(true);

      return false;
    } else if (dataobject.MinPrice < 1) {
      setError("Minimum Price is Required");
      setSnackBar(true);
      setShowError(true);

      return false;
    } else if (dataobject.Make.length < 1) {
      setError("Make is Required");
      setSnackBar(true);
      setShowError(true);

      return false;
    } else if (dataobject.Model.length < 1) {
      setError("Model is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.BodyType.length < 1) {
      setError("Body Type is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.Transmission.length < 1) {
      setError("Transmission is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.EngineSize <= 0) {
      setError("Engine Size is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.FuelType.length <= 0) {
      setError("Fuel Type is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.KMsDriven <= 0) {
      setError("Kilometers Driven is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.Color.length <= 0) {
      setError("Color Type is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.VINum.length <= 0) {
      setError("Number Plate is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.SeatCount <= 0) {
      setError("No. of seats is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (dataobject.DoorCount <= 0) {
      setError("No. of doors is Required");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (!dataobject.ExteriorSlider && !dataobject.ExteriorVideo) {
      setError("Please Add Exterior Slider or Exterior Video");
      setSnackBar(true);
      setShowError(true);
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    console.log(dataobject);
    if (validateForm()) {
      postSellCar(dataobject)
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Grid
      container
      justify="center"
      component="main"
      className={classes.pageDefault}
    >
      <ErrorSnackBar
        visible={showSnackBar}
        setVisible={setSnackBar}
        message={error}
        severity="error"
      />
      <ErrorSnackBar
        visible={showSuccess}
        setVisible={setSuccess}
        message={"Car Listed Successfully"}
        severity="success"
      />
      <Grid item container xs={12} className={classes.APIGrid}>
        <img src={SellBackCar} className={classes.backgroundImg} alt="" />
        <Grid
          item
          container
          xs={11}
          md={9}
          justify="center"
          className={classes.ApiEncloser}
        >
          <Box className={classes.ContainerType_one}>
            <div size="small" className="IconImage">
              <img src={HappyCarIcon} />
              <span>Car Details</span>
            </div>
            <hr className={classes.Horizontal} />
            <div size="small" className="IconImage">
              <img src={FileTextIcon} />
              <span>Other Details</span>
            </div>
            <hr className={classes.Horizontal} />
            <div size="small" className="IconImage">
              <img src={EditIcon} />
              <span>Description</span>
            </div>
            <hr className={classes.Horizontal} />
            <div size="small" className="IconImage">
              <img src={ImageIcon} />
              <span>Upload Images</span>
            </div>
          </Box>
          <Box className={classes.ContainerType_one} id="APIbox">
            <Typography component="h3" variant="h5">
              Tell us about the car you are selling
            </Typography>
            <div className="searchField">
              <TextField
                id="outlined-basic"
                name="platenum"
                label="Enter your number plate"
                variant="outlined"
              />
              <button onClick={() => FetchJam()}>Search</button>
            </div>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              className="FetchData"
            >
              <Typography component="h3" variant="h4">
                Car Details
              </Typography>
              <div className="DetailsContainer">
                <span>
                  Make : <span id="Make"></span>
                </span>
                <span>
                  Year : <span id="ModelYear"></span>
                </span>
                <span>
                  Body Style : <span id="BodyStyle"></span>
                </span>
                <span>
                  Model : <span id="Model"></span>
                </span>
                <span>
                  No of Oweners : <span id="NoOweners"></span>
                </span>
                <span>
                  Color : <span id="Color"></span>
                </span>
                <span>
                  Fuel Type : <span id="FuelType"></span>
                </span>
                <span>
                  VIN : <span id="VIN"></span>
                </span>
                <span>
                  Engine No : <span id="EngineNo"></span>
                </span>
                <span>
                  Plate Number : <span id="PlateNumber"></span>
                </span>
                <span>
                  Chassis : <span id="Chassis"></span>
                </span>
                <span>
                  Seats : <span id="Seats"></span>
                </span>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        item
        className={classes.FormGrid}
        xs={12}
        md={10}
        justify="center"
      >
        <Box className="PriceSetter" display="flex" alignItems="center">
          <Typography component="h1" variant="h2">
            Selling price details
          </Typography>
          <TextField
            className="priceinputs"
            type="number"
            name="Price"
            onChange={handleChange}
            label="Preffered selling price"
            variant="outlined"
            error={showErrors && dataobject.Price <= 0}
          />
          <TextField
            className="priceinputs"
            type="number"
            name="MinPrice"
            onChange={handleChange}
            label="Minimum selling price"
            variant="outlined"
            error={showErrors && dataobject.MinPrice <= 0}
          />
        </Box>
        <Grid item className={classes.FromFetch} xs={12}>
          <Grid className="Fetched_Details">
            <div className="BasicDetails">
              <Typography component="h3" variant="h5">
                Please Enter the details of your car
              </Typography>
              <div className="BasicDetails_form">
                <SelectBox
                  handleChange={handleChange}
                  name={"Make"}
                  data={MakeModel.map(({ Make }) => Make) || []}
                  value={dataobject.Make}
                  required
                  Label="Select Make"
                  error={showErrors && dataobject.Make.length <= 0}
                />
                <SelectBox
                  handleChange={handleChange}
                  name={"Model"}
                  required
                  data={
                    MakeModel.find(({ Make }) => Make === dataobject.Make)
                      ?.Models || []
                  }
                  value={dataobject.Model}
                  error={showErrors && dataobject.Model.length <= 0}
                  Label="Model"
                />
                <SelectBox
                  handleChange={handleChange}
                  name={"ModelYear"}
                  data={getLast20Years()}
                  value={dataobject.ModelYear}
                  required={true}
                  error={showErrors && dataobject.ModelYear.length <= 0}
                  Label="Model Year"
                />
                <SelectBox
                  handleChange={handleChange}
                  name={"BodyType"}
                  data={bodyTypes}
                  value={dataobject.BodyType}
                  required={true}
                  error={showErrors && dataobject.BodyType.length <= 0}
                  Label="Body Type"
                />
                <SelectBox
                  handleChange={handleChange}
                  name={"Transmission"}
                  data={transmissionTypes}
                  value={dataobject.Transmission}
                  required={true}
                  error={showErrors && dataobject.Transmission.length <= 0}
                  Label="Transmission"
                />
                <TextField
                  type="number"
                  onChange={handleChange}
                  name={"EngineSize"}
                  value={dataobject.EngineSize}
                  required={true}
                  error={showErrors && dataobject.EngineSize <= 0}
                  label="Engine Size"
                />
                <SelectBox
                  handleChange={handleChange}
                  name={"FuelType"}
                  data={fuelTypes}
                  value={dataobject.FuelType}
                  required={true}
                  error={showErrors && dataobject.FuelType.length <= 0}
                  Label="Fuel Type"
                />
                <TextField
                  onChange={handleChange}
                  type="number"
                  name={"KMsDriven"}
                  value={dataobject.KMsDriven}
                  required={true}
                  error={showErrors && dataobject.KMsDriven <= 0}
                  label="Kilometers Ran"
                />
                <TextField
                  onChange={handleChange}
                  name={"Color"}
                  value={dataobject.Color}
                  required={true}
                  error={showErrors && dataobject.Color.length <= 0}
                  label="Color Type"
                />
                <TextField
                  onChange={handleChange}
                  name={"VINum"}
                  value={dataobject.VINum}
                  required={true}
                  label="Number Plate"
                  error={showErrors && dataobject.VINum.length <= 0}
                />
                <TextField
                  onChange={handleChange}
                  type="number"
                  name={"SeatCount"}
                  value={dataobject.SeatCount}
                  required={true}
                  label="Number of seats"
                  error={showErrors && dataobject.SeatCount <= 0}
                />

                <SelectBox
                  handleChange={handleChange}
                  name={"DoorCount"}
                  data={doorCounts}
                  value={dataobject.DoorCount}
                  required={true}
                  Label="Number of doors"
                  error={showErrors && dataobject.DoorCount <= 0}
                />
              </div>
            </div>
            <div className="ExtraDetails">
              <Typography component="h3" variant="h5">
                Help us know more about your car
              </Typography>
              <TextField
                onChange={handleChange}
                name={"ModelDetail"}
                value={dataobject.ModelDetail}
                label="Model Details"
              />

              <SelectBox
                handleChange={handleChange}
                name={"ImportHistory"}
                data={["Don't Know", "Imported"]}
                value={dataobject.ImportHistory}
                Label="Import History"
              />
              <SelectBox
                handleChange={handleChange}
                name={"PreviousOwners"}
                value={dataobject.PreviousOwners}
                data={["1", "2", "3", "4", "5", "5+"]}
                Label="Previous Oweners"
              />
              <SelectBox
                handleChange={handleChange}
                name={"Cylinders"}
                value={dataobject.Cylinders}
                data={[
                  "Don't Know",
                  "Rotatary",
                  "4 - Cylinder",
                  "6 - Cylinder",
                  "8 - Cylinder",
                  "10 - Cylinder",
                  "12 - Cylinder",
                ]}
                Label="Cylinders"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="reg"
                  label="Registration Expiry"
                  name="REGExpiry"
                  value={dataobject.REGExpiry}
                  onChange={(date) =>
                    changedata({ ...dataobject, REGExpiry: date })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="wof"
                  label="WOF Expiry"
                  name="WOFExpiry"
                  value={dataobject.WOFExpiry}
                  onChange={(date) =>
                    changedata({ ...dataobject, WOFExpiry: date })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </Grid>
          <Grid>
            <div className="Description">
              <Typography component="h3" variant="h5">
                Describe your car in 300-500 words
              </Typography>
              <div>
                <RichTextEditor handleEditorChange={handleEditorChange} />
              </div>
            </div>
            <div className="FileUpload">
              <Typography component="h3" variant="h5">
                Upload Car Images
              </Typography>
              <div className="InteriorImages">
                <Typography component="h3" variant="h5">
                  Upload Interior Images
                </Typography>
                <div>
                  <FileInput
                    accept="image/*"
                    name="InteriorFront"
                    id="InteriorFront"
                    onChange={handleFileUpload}
                    previewUrl={preview.InteriorFront}
                  />
                  <FileInput
                    accept="image/*"
                    name="InteriorMiddle"
                    id="InteriorMiddle"
                    onChange={handleFileUpload}
                    previewUrl={preview.InteriorMiddle}
                  />
                  <FileInput
                    accept="image/*"
                    name="InteriorRear"
                    id="InteriorRear"
                    onChange={handleFileUpload}
                    previewUrl={preview.InteriorRear}
                  />
                </div>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="ExteriorImages">
                <Typography component="h3" variant="h5">
                  Upload Exterior Images
                </Typography>
                <div>
                  <MultiFileInput onChange={handleMultiFileUpload} filesUploaded={dataobject.ExteriorSlider}/>
                  <FileInput
                    accept="video/*"
                    name="ExteriorVideo"
                    id="ExteriorVideo"
                    type="video"
                    onChange={handleVideoUpload}
                  />
                </div>
              </div>
            </div>
            <Box display="flex" justifyContent="flex-end">
              <Button className={classes.LoginButton} onClick={handleSubmit}>
                SUBMIT
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(SellCar);
