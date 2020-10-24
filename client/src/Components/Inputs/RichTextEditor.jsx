import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function RichTextEditor({handleEditorChange}) {
  return (
    <Editor
      initialValue="Something about car..."
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
      }}
      onEditorChange={handleEditorChange}
    />
  );
}

export default RichTextEditor;
