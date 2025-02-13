import { useState } from "react";
import { Collapse } from "react-bootstrap";

function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <div className="card shadow mt-5 p-5 me-2">
          <div className="d-flex justify-content-between">
            <h1>Profile</h1>
            <button
              className="btn btn-outline-info"
              onClick={() => setOpen(!open)}
            >
              <i class="fa-solid fa-angle-down"></i>
            </button>
          </div>
          <Collapse in={open}>
          <div className="row justify-content-center p-5">
            <label>
              <input type="file" style={{ display: "none" }} />
              <img
                src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1733210600~exp=1733214200~hmac=1d3e29398765d1aab2b47b7b782977119f1a8eb8bacdc039194905f4fca29093&w=740"
                alt="profile"
                width={"100%"}
              />
            </label>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Github Link"
                className="form-control"
              />
              <br />
              <input
                type="text"
                placeholder="LinkedIn Link"
                className="form-control"
              />
              <div className="d-grid mt-5">
                <button className="btn btn-warning">Update</button>
              </div>
            </div>
          </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default Profile;
