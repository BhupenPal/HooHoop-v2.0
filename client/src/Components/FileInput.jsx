import React from "react";
import AddIcon from "@material-ui/icons/Add";

function FileInput({ id, name, accept ,onChange, multiple, previewUrl,type}) {
  const renderPreview = () => {
    if(previewUrl){
      return (
      
          <img 
            height={"100%"}
            style={{
              maxWidth:"100%"
            }}
          src={previewUrl} alt="preview"/>
        
      )
    }else{
      return <AddIcon/>
    }
  }
  return (
    <div>
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
        className="button MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-fullWidth"
        htmlFor={id}
      >
      {renderPreview()}

      </label>

    </div>
  );
}

export default FileInput;
