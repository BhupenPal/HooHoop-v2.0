import React, { useEffect } from "react";

function View360Slides(props) {

  useEffect(() => {
    window.CI360.init();
    // return () => {
    //   window.CI360.destroy();
    // };
  }, []);
  return (
    <div
      className="cloudimage-360"
      data-folder="src/assets/img/sample-car/exterior/"
      data-filename="Photo_{index}.jpg"
      data-amount="33"
      data-spin-reverse
    ></div>
  );
}

export default View360Slides;
