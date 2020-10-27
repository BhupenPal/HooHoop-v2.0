import React from "react";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from '@material-ui/icons/Check';
function FileInput({
  id,
  name,
  accept,
  onChange,
  multiple,
  previewUrl,
  label,
  type,
  currentValue
}) {
  const renderPreview = () => {
    if(type === "video" && currentValue && currentValue.length > 0){
      return <CheckIcon/>
    }
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
