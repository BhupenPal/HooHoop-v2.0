import React, { useEffect } from "react";
import { getFramesFolder } from "../utils/getImagesUrl";

function View360Slides({VINum,noOfFrames}) {

  useEffect(() => {
    window.CI360.init();
    // return () => {
    //   window.CI360.destroy();
    // };
  }, []);
  return (
    <div
      className="cloudimage-360"
      data-folder={getFramesFolder(VINum)}
      data-filename="Photo_{index}.jpg"
      data-amount={noOfFrames}
      data-spin-reverse
    ></div>
  );
}

export default View360Slides;
