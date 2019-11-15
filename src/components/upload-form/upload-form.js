import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { fetchData } from "./../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./upload-form.css";

const UploadForm = ({ fetchData }) => {
  const [fileData, setFileData] = useState(null);

  const onChooseFileHandler = e => {
    console.log(e.target.files[0]);
    setFileData(e.target.files[0]);
  };

  const onUploadFileHandler = () => {
    const fd = new FormData();
    fd.append("file", fileData);
    axios.post("/upload", fd).then(res => fetchData(res.data));
  };

  return (
     <Form className="m-5 upload-form">

      <div className="example-1">
        <div className="form-group">
          <label className="label">
            <i className="material-icons">attach_file</i>
            <span className="title">{fileData === null ? "Add file" : fileData.name}</span>
            <input
              type="file"
              accept=".txt"
              onChange={e => {
                onChooseFileHandler(e);
              }}
            />
            
          </label>
        </div>
      </div>
      

      <Link to={process.env.PUBLIC_URL + "/"}>
        <Button
          variant="success"
          className="m-3"
          onClick={() => {
            onUploadFileHandler();
          }}
        >
          Submit
        </Button>
      </Link>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <Button variant="primary" className="m-3">
          Go back
        </Button>
      </Link>
    </Form>
  );
};

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

const mapDispatchToProps = { fetchData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadForm);
