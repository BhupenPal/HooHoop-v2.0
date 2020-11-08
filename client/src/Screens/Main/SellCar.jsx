import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  TextField,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import styles from "../../assets/material/SellForm";
import SellBackCar from "../../assets/img/SellCar/sellbackground.png";
import ImageIcon from "../../assets/img/svgs/Image.svg";
import EditIcon from "../../assets/img/svgs/edit-3.svg";
import HappyCarIcon from "../../assets/img/svgs/Car.svg";
import FileTextIcon from "../../assets/img/svgs/file-text.svg";
import "../../assets/css/sellcarpage.scss";
import SelectBox from "../../Components/Inputs/SelectBox.jsx";
import axios from "../../utils/axios";
import MakeModel from "../../assets/data/MakeModel";
import RichTextEditor from "../../Components/Inputs/RichTextEditor.jsx";
import FileInput from "../../Components/Inputs/FileInput.jsx";
import { postSellCar } from "../../services/sellCar.js";
import ErrorSnackBar from "../../Components/OpenSnackBar.jsx";
import MultiFileInput from "../../Components/MultiFileInput.jsx";
import { colors,bodyTypes,transmissionTypes, fuelTypes,states,accessories } from "../../assets/data/carTypes";
import BodyTypeCodes from "../../assets/data/bodyTypes.js";
import FuelTypeCodes from "../../assets/data/fuelTypes.js";

const SellCar = (props) => {
  const { classes } = props;

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
    EngineSize: null,
    FuelType: "",
    Color: "",
    Description: "",
    KMsDriven: null,
    VINum: "",
    State:"",
    DoorCount: null,
    SeatCount: null,
    REGExpiry: new Date(),
    WOFExpiry: new Date(),
    InteriorFront: null,
    InteriorRear: null,
    InteriorMiddle: null,
    ExteriorSlider: null,
    ExteriorVideo: null,
    FuelStar:null,
    SafetyStar:null,
    Accessories:[],
  });
  const [modelOptions, setModels] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setModels(
      MakeModel.find(({ Make }) => Make === dataobject.Make)?.Models || []
    );
  }, [dataobject.Make]);
  const handleVideoUpload = (e) => {
    // if(e.target && e.target.files)
    const files = e.target.files;
    if (files && files.length > 0) {
      // console.log(e, files);
      changedata({ ...dataobject, ExteriorVideo: files });
      var video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        var duration = video.duration;
        if (duration > 40) {
          changedata({ ...dataobject, ExteriorVideo: null });
          setError("Video must be less than 40 sec");
          setSnackBar(true);
          setShowError(true);
        }
      };
      video.src = URL.createObjectURL(files[0]);
    } else {
      changedata({ ...dataobject, ExteriorVideo: null });
    }
  };
  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPreview({
        ...preview,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      });
      changedata({ ...dataobject, [e.target.name]: e.target.files });
    }
  };
  const handleMultiFileUpload = (files) => {
   
    changedata({ ...dataobject, ExteriorSlider: files });
  };
  
  const handleSelectChange = (name,value) => {
   // console.log(e.target);
 changedata({ ...dataobject, [name]: value });
};
  const handleChange = (e) => {
      
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
  
  }, [dataobject]);

  const TransmissionStringConvert = CarJamTransmission => {
    if (CarJamTransmission.includes("automatic")) {
      return "Automatic"
    } else if (CarJamTransmission.includes("manual")) {
      return "Manual"
    } else if (CarJamTransmission.includes("triptonic")) {
      return "Triptonic"
    } else if (CarJamTransmission.includes("CVT")) {
      return "CVT"
    } else {
      return ""
    }
  }

  const FetchJam = () => {
    var platenum = document.getElementsByName("platenum")[0].value;
    axios
      .get(`/api/user/car-data-fetch/${platenum}`)
      .then((res) => {
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
        
        changedata({
          ...dataobject,
          Make: res.data.make.replaceAll("-"," "),
          Model: res.data.model,
          ModelYear: res.data.year_of_manufacture,
          BodyType: BodyTypeCodes[res.data.body_style] || "Others",
          Transmission: TransmissionStringConvert(res.data.transmission),
          EngineSize: res.data.cc_rating,
          FuelType: FuelTypeCodes[res.data.fuel_type] || "Others",
          KMsDriven: parseInt(res.data.latest_odometer_reading),
          Color: res.data.main_colour,
          VINum: res.data.plate,
          SeatCount: parseInt(res.data.no_of_seats),
          WOFExpiry: !!parseInt(res.data.expiry_date_of_last_successful_wof) ? new Date(parseInt(res.data.expiry_date_of_last_successful_wof)) : '',
          REGExpiry: !!parseInt(res.data.plates[0].effective_date) ? new Date(parseInt(res.data.plates[0].effective_date)) : '',
          FuelStar: res.data.safety_economy.fuel_stars,
          SafetyStar: res.data.safety_economy.driver_safety_stars,
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
    } else if (dataobject.SeatCount < 1 && dataobject.SeatCount > 11) {
      setError("No. of seats must be betweeen 1 and 11");
      setSnackBar(true);
      setShowError(true);
      return false;
    } else if (!dataobject.State && dataobject.State.length <= 0) {
      setError("State is Required");
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
      setLoader(true);
      postSellCar(dataobject)
        .then(() => {
          setSuccess(true);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  };
  const searchCar = (e) => {
    e.preventDefault()
    FetchJam()
  }
  return (
    <Grid
      container
      justify="center"
      component="main"
      className={`${classes.pageDefault} fadeIn`}
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
            <form onSubmit={searchCar} className="searchField">
              <TextField
                id="outlined-basic"
                name="platenum"
                label="Enter your number plate"
                variant="outlined"
              />
              <button onClick={() => FetchJam()}>Search</button>
            </form>
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
                  handleChange={handleSelectChange}
                  type="autocomplete"
                  name="Make"
                  data={MakeModel.map(({ Make }) => Make) || []}
                  value={dataobject.Make}
                  required
                  Label="Make"
                  error={showErrors && dataobject.Make.length <= 0}
                />
                <SelectBox
                  handleChange={handleSelectChange}
                  name={"Model"}
                  type="autocomplete"
                  required
                  data={modelOptions}
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
                  handleChange={handleSelectChange}
                  name={"BodyType"}
                  type="autocomplete"

                  data={bodyTypes}
                  value={dataobject.BodyType}
                  required={true}
                  error={showErrors && dataobject.BodyType.length <= 0}
                  Label="Body Type"
                />
                <SelectBox
                  handleChange={handleSelectChange}
                  name={"Transmission"}
                  type="autocomplete"

                  data={transmissionTypes}
                  value={dataobject.Transmission }
                  required={true}
                  error={showErrors && dataobject.Transmission.length <= 0}
                  Label="Transmission"
                />
                <TextField
                  type="number"
                  onChange={handleChange}
                  name={"EngineSize"}
                  value={dataobject.EngineSize ? dataobject.EngineSize : "" }
                  inputProps={{className:'digitsOnly'}}
                  required={true}
                  id="random"
                  error={showErrors && dataobject.EngineSize <= 0}
                  label="Engine Size"
                />
                <SelectBox
                  handleChange={handleSelectChange}
                  name={"FuelType"}
                  data={["Don't Know",...fuelTypes]}
                  type="autocomplete"

                  value={dataobject.FuelType}
                  required={true}
                  error={showErrors && dataobject.FuelType.length <= 0}
                  Label="Fuel Type"
                />
                <TextField
                  onChange={handleChange}
                  type="number"
                  name={"KMsDriven"}
                  value={dataobject.KMsDriven ? dataobject.KMsDriven : ""}
                  required={true}
                  error={showErrors && dataobject.KMsDriven <= 0}
                  label="Kilometers Ran"
                />
                <SelectBox
                  handleChange={handleSelectChange}
                  name={"Color"}
                  data={colors}
                  type="autocomplete"

                  value={dataobject.Color}
                  required={true}
                  error={showErrors && dataobject.Color.length <= 0}
                  Label="Color"
                />
                <TextField
                  onChange={handleChange}
                  name={"VINum"}
                  value={dataobject.VINum}
                  required={true}
                  label="Number Plate"
                  error={showErrors && dataobject.VINum.length <= 0}
                />
                <SelectBox
                  handleChange={handleChange}
                  name={"SeatCount"}
                  data={[1,2,3,4,5,6,7,8,9,10,11]}

                  value={dataobject.SeatCount}
                  required={true}
                  error={showErrors && (dataobject.SeatCount <= 0 || dataobject.SeatCount > 11)}
                  Label="Number of seats"
                />
                <SelectBox
                  handleChange={handleSelectChange}
                  name={"State"}
                  data={states}
                  type="autocomplete"

                  value={dataobject.State}
                  required={true}
                  error={showErrors && dataobject.State.length <= 0}
                  Label="State"
                />

              </div>
            </div>
            <div className="ExtraDetails">
              <Typography component="h3" variant="h5">
                Help us know more about your car
              </Typography>

              <SelectBox
                  handleChange={handleChange}
                  name={"DoorCount"}
                  data={doorCounts}
                  value={dataobject.DoorCount}
              
                  Label="Number of doors"
                  error={showErrors && dataobject.DoorCount.length <= 0}
                />
              <SelectBox
                handleChange={handleChange}
                name={"ImportHistory"}
                data={["New Zealand New", "Imported"]}
                value={dataobject.ImportHistory}
                Label="Import History"
              />
              <SelectBox
                handleChange={handleChange}
                name={"accessories"}
                multiple={true}
                value={dataobject.Accessories}
                data={accessories}
                Label="Select Accessories"
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
                  "12 - Cylinder"
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
                    label="Front"
                    onChange={handleFileUpload}
                    previewUrl={preview.InteriorFront}
                  />
                  <FileInput
                    accept="image/*"
                    name="InteriorMiddle"
                    id="InteriorMiddle"
                    label="Middle"
                    onChange={handleFileUpload}
                    previewUrl={preview.InteriorMiddle}
                  />
                  <FileInput
                    accept="image/*"
                    name="InteriorRear"
                    id="InteriorRear"
                    label="Rear"
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
                  <MultiFileInput
                    label="Slider"
                    onChange={handleMultiFileUpload}
                    filesUploaded={dataobject.ExteriorSlider}
                  />
                  <FileInput
                    accept="video/*"
                    name="ExteriorVideo"
                    id="ExteriorVideo"
                    type="video"
                    label="Video"
                    type="video"
                    currentValue={dataobject.ExteriorVideo}
                    onChange={handleVideoUpload}
                  />
                </div>
              </div>
            </div>
            <Box display="flex" justifyContent="flex-end">
              <Button
                disabled={loader}
                className={classes.LoginButton}
                onClick={handleSubmit}
              >
                {loader ? (
                  <CircularProgress
                    className={classes.circularProgress}
                    size={20}
                    style={{ margin: "0 1rem" }}
                  />
                ) : null}
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
