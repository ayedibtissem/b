import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createVisit } from "../redux/Slices/visitSlice";
const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddNewVisit = () => {
  const [visitData, setVisitData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, loading, userVisits } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = visitData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleVisit = userVisits.find((visit) => visit._id === id);
      console.log(singleVisit);
      setVisitData({ ...singleVisit });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title && description ) {
      const updatedVisitData = { ...visitData, name: user?.result?.name };

      if (!id) {
        dispatch(createVisit({ updatedVisitData , navigate, toast }));
    ;
      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setVisitData({ ...visitData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setVisitData({ ...visitData, tags: [...visitData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setVisitData({
      ...visitData,
      tags: visitData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setVisitData({ title: "", description: "", tags: [] });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Visit" : "Add Visit"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <input
                  type="text"
                  
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setVisitData({ ...visitData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

                  
                  export default AddNewVisit;