import React, { useState } from 'react';
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

function CarDetails({car,classes}) {
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
        <div
          className={`${classes.boxContainer} ${classes.detailsContainer}`}
        >
          <div
            className={classes.detailsHeader}
            onClick={() => setShowDetails((val) => !val)}
          >
            {showDetails ? (
              <>
                Hide All Details{" "}
                <ExpandLessSharpIcon style={{ color: "#E85513" }} />
              </>
            ) : (
              <>
                Show Details <ChevronRightIcon style={{ color: "#E85513" }} />
              </>
            )}
          </div>
          {!showDetails ? null : (
            <div className={classes.details}>
              <div className={classes.detail}>
                <p className={classes.detailHead}>Reg. Expiry</p>
                <p>{car?.REGExpiry}</p>
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
            </div>
          )}
        </div>
        <div style={{ padding: "1rem" }}>
          <h2>Description</h2>
          <p>{car?.Description}</p>
        </div>
      </div>
    
    );
}

export default CarDetails;