import React from "react";
import AddIcon from "@material-ui/icons/Add";

function FileInput({ id, name, accept ,onChange}) {
  return (
    <>
      <input
        accept={accept}
        style={{ display: "none" }}
        name={name}
        id={id}
        type="file"
        onChange={onChange}
      />
      <label
        className="button MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-fullWidth"
        htmlFor={id}
      >
          <AddIcon/>
      </label>
    </>
  );
}

export default FileInput;
