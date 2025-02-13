import React, { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectAPI } from "../services/allAPI";
import { addProjectResponseContext } from "../ContextAPI/ContextShare";
function AddProject() {
  const {addProjectResponse, setAddProjectResponse} = useContext(
    addProjectResponseContext
  );
  const [show, setShow] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    languages: "",
    overview: "",
    github: "",
    website: "",
    projectImage: "",
  });
  const [preview, setPreview] = useState("");
  const [fileStatus, setFileStatus] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: "",
      languages: "",
      overview: "",
      github: "",
      website: "",
      projectImage: "",
    });
    setPreview("");
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (
      projectData.projectImage.type == "image/png" ||
      projectData.projectImage.type == "image/jpg" ||
      projectData.projectImage.type == "image/jpeg"
    ) {
      console.log("generate url");
      setPreview(URL.createObjectURL(projectData.projectImage));
      setFileStatus(false);
    } else {
      console.log("please upload only following formats  (png/jpg/jpeg)");
      setFileStatus(true);
      setProjectData({ ...projectData, projectImage: "" });
    }
  }, [projectData.projectImage]);

  const handleAddProject = async () => {
    const { title, languages, overview, github, website, projectImage } =
      projectData;
    if (
      !title ||
      !languages ||
      !overview ||
      !github ||
      !website ||
      !projectImage
    ) {
      toast.info("Please fill missing Fields");
    } else {
      // toast.success("Proceed to api call");
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("projectImage", projectImage);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        };
        try {
          const result = await addProjectAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status == 200) {
            toast.success("Project Uploaded");
            handleClose();
            setAddProjectResponse(result.data);
          } else {
            toast.warning(result.response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <>
      <Button variant="dark" onClick={handleShow} className="me-2 rounded">
        Add-Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projectImage: e.target.files[0],
                    })
                  }
                />
                <img
                  height={"350px"}
                  width={"100%"}
                  src={
                    preview
                      ? preview
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPsli37FvqcfeAmXVmRth65Tz0B-7jxhKC7DqWgE-WhymxXNFgPh1r6OTrDOCyIfA8CU&usqp=CAU"
                  }
                  alt="image"
                />
              </label>
              {fileStatus && (
                <div className="mb-3 text-danger">
                  please upload only following formats (png/jpg/jpeg)
                </div>
              )}
            </div>
            <div className="col-6">
              <Form>
                <div className="mb-2">
                  <FloatingLabel
                    controlId="floatingtitle"
                    label="Project-Title"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Project Title"
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          title: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>
                </div>
                <div className="mb-2">
                  <FloatingLabel
                    controlId="floatinglanguage"
                    label="Languages-Used"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Project Language"
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          languages: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>
                </div>
                <div className="mb-2">
                  <FloatingLabel
                    controlId="floatingOverview"
                    label="Project-Overview"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Overview"
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          overview: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>
                </div>
                <div className="mb-2">
                  <FloatingLabel controlId="floatinggit" label="Github-Link">
                    <Form.Control
                      type="text"
                      placeholder="Github"
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          github: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>
                </div>
                <div className="mb-2">
                  <FloatingLabel controlId="floatingweb" label="Website-Link">
                    <Form.Control
                      type="text"
                      placeholder="Website Link"
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          website: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleAddProject}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default AddProject;
