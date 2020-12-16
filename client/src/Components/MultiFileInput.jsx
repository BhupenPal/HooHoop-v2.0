import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { DropzoneDialog } from "material-ui-dropzone";

function MultiFileInput({
  
  onChange,
  filesUploaded,
  label,
}) {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => {
    setVisible(false);
  };
  return (
    <div style={{flexDirection:"column"}}>
      <DropzoneDialog
        open={visible}
        // onChange={}
        filesLimit={12}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={hideDialog}
        onSave={(files) => {
          onChange(files);
          hideDialog();
        }}
      />
      <div
        className="button MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-fullWidth"
        onClick={showDialog}
      >
        {filesUploaded && filesUploaded.length > 0 ? (
          `${filesUploaded.length} Image${filesUploaded.length === 1 ? "":"s"} Added`
        ) : (
          <AddIcon />
        )}
      </div>
      <div>{label}</div>

    </div>
  );
}

export default MultiFileInput;
