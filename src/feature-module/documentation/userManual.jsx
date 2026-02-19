import React from 'react';
import { Download, ChevronUp } from 'react-feather';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setToogleHeader } from '../../core/redux/action';
import '../../style/scss/pages/_userManual.scss';

const UserManual = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/User_Manual.pdf';
    link.download = 'User_Manual.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>Collapse</Tooltip>
  );

  const renderDownloadTooltip = (props) => (
    <Tooltip id="download-tooltip" {...props}>Download PDF</Tooltip>
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>User Manual V 1.0</h4>
            <h6>View and download user manual</h6>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={renderDownloadTooltip}>
                <Link onClick={handleDownload}>
                  <Download />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                <Link
                  className={data ? "active" : ""}
                  onClick={() => { dispatch(setToogleHeader(!data)) }}
                >
                  <ChevronUp />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </div>

        <div className="card table-list-card">
          <div className="card-body p-0">
            <div className={`pdf-container ${data ? 'header-collapsed' : ''}`}>
              <iframe
                src="/User_Manual.pdf"
                title="User Manual PDF"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManual;