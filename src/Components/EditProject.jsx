import React, { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { server_url } from "../services/serverurl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProjectAPI } from "../services/allAPI";
import { editProjectResponseContext } from "../ContextAPI/ContextShare";

function EditProject({ project }) {
  const [show, setShow] = useState(false);
const {editProjectResponse, setEditProjectResponse}=useContext(editProjectResponseContext)
  const handleClose = () => {
    setShow(false);
    setProjectData({
      id: project?._id,
      title: project?.title,
      languages: project?.languages,
      overview: project?.overview,
      github: project?.github,
      website: project?.website,
      projectImage: "",
    });
  };
  const handleShow = () => setShow(true);
  const [projectData, setProjectData] = useState({
    id: project?._id,
    title: project?.title,
    languages: project?.languages,
    overview: project?.overview,
    github: project?.github,
    website: project?.website,
    projectImage: "",
  });

  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      setPreview("");
    }
  }, [projectData.projectImage]);

  const handleUpdate = async () => {
    const { id, title, languages, overview, github, website, projectImage } =
      projectData;
    if (!title || !languages || !overview || !github || !website) {
      toast.info("Please fill missing Fields");
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      preview
        ? reqBody.append("projectImage", projectImage)
        : reqBody.append("projectImage", project.projectImage);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        };
        //   API call
        try {
          const result = await updateProjectAPI(id, reqBody, reqHeader);
          console.log(result);
          if (result.status == 200) {
            handleClose();
            setEditProjectResponse(result.data)
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
    <div>
      <a className="me-3 btn text-dark" onClick={handleShow}>
        <i class="fa-solid fa-pen-to-square"></i>
      </a>
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
                      : `${server_url}/uploads/${project?.projectImage}`
                  }
                  alt="image"
                />
              </label>

              <div className="mb-3 text-danger">
                please upload only following formats (png/jpg/jpeg)
              </div>
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
                      value={projectData?.title}
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
                      value={projectData?.languages}
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
                      value={projectData?.overview}
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
                      value={projectData?.github}
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
                      value={projectData?.website}
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
          <Button variant="dark" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer theme="colored" autoClose={2000} />
    </div>
  );
}

export default EditProject;
