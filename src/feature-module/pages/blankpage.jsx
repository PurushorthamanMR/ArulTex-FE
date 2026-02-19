import React from "react";

const Blankpage = () => {
  return (
    <div className="page-wrapper pagehead">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Blank Page</h4>
            <h6>Sub Title</h6>
          </div>
          <ul className="table-top-head">
            <li>
              <a
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Refresh"
              >
                <i data-feather="rotate-ccw" className="feather-rotate-ccw" />
              </a>
            </li>
            <li>
              <a
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Collapse"
                id="collapse-header"
              >
                <i data-feather="chevron-up" className="feather-chevron-up" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blankpage;
