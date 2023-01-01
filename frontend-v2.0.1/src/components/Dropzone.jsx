import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaEdit } from "react-icons/fa";

const MyDropzone = () => {

  const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles = ".jpg,.jpeg,.png";

        // Do something with the files
        console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>
          Drop your Bootcamp Photos here
          <FaEdit />
         </p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};



export default MyDropzone;