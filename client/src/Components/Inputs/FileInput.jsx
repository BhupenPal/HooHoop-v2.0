import React from "react";
import AddIcon from "@material-ui/icons/Add";

function FileInput({
  id,
  name,
  accept,
  onChange,
  multiple,
  previewUrl,
  label,
}) {
  const renderPreview = () => {
    if (previewUrl) {
      return (
        <img
          height={"100%"}
          style={{
            maxWidth: "100%",
          }}
          src={previewUrl}
          alt="preview"
        />
      );
    } else {
      return <AddIcon />;
    }
  };
  return (
    <div style={{flexDirection:"column"}}>
      <input
        accept={accept}
        style={{ display: "none" }}
        name={name}
        id={id}
        type="file"
        multiple={multiple || false}
        onChange={onChange}
      />
      <label
        className="button MuiButtonBase-root MuiButton-root MuiButton-fullWidth"
        htmlFor={id}
      >
        {renderPreview()}
      </label>
      <div>{label ? label : ""}</div>
    </div>
  );
}

export default FileInput;
