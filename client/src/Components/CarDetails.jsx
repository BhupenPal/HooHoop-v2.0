import React, { useState } from "react";
import MilageIcon from "../assets/img/svgs/milage.svg";
import EngineIcon from "../assets/img/svgs/engine.svg";
import TransmissionIcon from "../assets/img/svgs/automation.svg";
import PowerIcon from "../assets/img/svgs/power.svg";
import ColorIcon from "../assets/img/svgs/color.svg";
import SeatIcon from "../assets/img/svgs/chair.svg";
import { Rating } from "@material-ui/lab";
import RoundedIcon from "./icons/RoundedIcons.jsx";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLessSharpIcon from "@material-ui/icons/ExpandLessSharp";
import SanitizeHTML from "./SanitizeHtml.jsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
function CarDetails({ car, classes }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      <div className={`${classes.boxContainer}`}>
        <h2>Top Specs</h2>
        <div className={`${classes.iconsContainer} ${classes.topSpecs}`}>
          <RoundedIcon
            icon={MilageIcon}
            title="Milage"
            content={`${car?.ONRoadCost} kmpl`}
          />
          <RoundedIcon
            icon={EngineIcon}
            title="Engine"
            content={`${car?.EngineSize} cc`}
          />
          <RoundedIcon
            icon={TransmissionIcon}
            title="Transmission"
            content={`${car?.Transmission}`}
          />
          <RoundedIcon
            icon={PowerIcon}
            title="Max. Power"
            content={`${car?.EngineSize} bhp`}
          />
          <RoundedIcon
            icon={ColorIcon}
            title="Color"
            content={`${car?.Color}`}
          />
          <RoundedIcon
            icon={SeatIcon}
            title="Seats"
            content={`${car?.SeatCount}`}
          />
        </div>
      </div>
      <Accordion
        className={`${classes.detailsContainer}`}
        style={{  }}
      >
        <AccordionSummary
          expandIcon={<ChevronRightIcon style={{ color: "#E85513" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          margin={0}
        >
          <div className={classes.detailsHeader}>Show Details </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.detail}>
            <p className={classes.detailHead}>Reg. Expiry</p>
            <p>{car?.REGExpiry && new Date(car.REGExpiry).toDateString()}</p>
          </div>
          <div className={classes.detail}>
            <p className={classes.detailHead}>Fuel Economy</p>
            <p>
              {" "}
              <Rating
                name="half-rating-read"
                precision={0.1}
                readOnly={true}
                className={"MuiRating-decimal"}
                value={car?.FuelStar || 0}
                size="small"
              />
            </p>
          </div>
          <div className={classes.detail}>
            <p className={classes.detailHead}>On Road Cost</p>
            <p>{car?.ONRoadCost}</p>
          </div>
          <div className={classes.detail}>
            <p className={classes.detailHead}>Safety Stars</p>
            <p>
              {" "}
              <Rating
                name="half-rating-read"
                value={car?.SafetyStar || 0}
                size="small"
              />
            </p>
          </div>
          <div className={classes.detail}>
            <p className={classes.detailHead}>Drive Type</p>
            <p>{car?.DriveWheel4}</p>
          </div>
        </AccordionDetails>
      </Accordion>

      <div style={{ padding: "2rem",marginTop:"1rem" }}>
        <h2>Description</h2>
        <p className={classes.description}>
          <SanitizeHTML html={car?.Description} />{" "}
        </p>
      </div>
    </div>
  );
}

export default CarDetails;
