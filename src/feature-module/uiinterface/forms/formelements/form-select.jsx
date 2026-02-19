import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../../Router/all_routes";

const FormSelect = () => {
  const route = all_routes;
  return (
    <div>
      <div className="page-wrapper cardhead">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Form Select</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={route.dashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Form Select</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Basics</h5>
                </div>
                <div className="card-body">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected="">Open this select menu</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Sizing</h5>
                </div>
                <div className="card-body">
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option selected="">Open this select menu</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select>
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                  >
                    <option selected="">Open this select menu</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Multiple Select</h5>
                </div>
                <div className="card-body">
                  <select
                    className="form-select"
                    multiple=""
                    aria-label="multiple select example"
                  >
                    <option selected="">Open this select menu</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSelect;
