import React from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { AlertCircle, HelpCircle } from "react-feather";

const Popovers = () => {
  const popoverTop = (
    <Popover id="popover-top">
      <Popover.Header as="h3">Popover Top</Popover.Header>
      <Popover.Body>
        And here&apos;s some amazing content. It&apos;s very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  const popoverRight = (
    <Popover id="popover-right">
      <Popover.Header as="h3">Popover Right</Popover.Header>
      <Popover.Body>
        And here&apos;s some amazing content. It&apos;s very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  const popoverBottom = (
    <Popover id="popover-bottom">
      <Popover.Header as="h3">Popover Bottom</Popover.Header>
      <Popover.Body>
        And here&apos;s some amazing content. It&apos;s very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  const popoverLeft = (
    <Popover id="popover-left">
      <Popover.Header as="h3">Popover Left</Popover.Header>
      <Popover.Body>
        And here&apos;s some amazing content. It&apos;s very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  const popoverTitle = (
    <Popover id="popover-example">
      <Popover.Header as="h3">Popover Title</Popover.Header>
      <Popover.Body>
        And here&apos;s some amazing content. It&apos;s very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  const popover1 = (
    <Popover id="popover-1">
      <Popover.Header as="h3">Popover Title</Popover.Header>
      <Popover.Body>
        And here&apos;s some amazing content. It&apos;s very engaging. Right?
      </Popover.Body>
    </Popover>
  );

  const popover2 = (
    <Popover id="popover-2">
      <Popover.Header as="h3">Popover Title</Popover.Header>
      <Popover.Body>
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
      </Popover.Body>
    </Popover>
  );

  const createPopover = (id, title, content, customClass) => (
    <Popover id={id} className={customClass}>
      <Popover.Header as="h3">{title}</Popover.Header>
      <Popover.Body>{content}</Popover.Body>
    </Popover>
  );

  const createPopoverLight = (id, title, content, customClass) => (
    <Popover id={id} className={customClass}>
      <Popover.Header as="h3">{title}</Popover.Header>
      <Popover.Body>{content}</Popover.Body>
    </Popover>
  );

  const createPopoverDark = (id, title, content, customClass) => (
    <Popover id={id} className={customClass}>
      <Popover.Header as="h3">{title}</Popover.Header>
      <Popover.Body>{content}</Popover.Body>
    </Popover>
  );

  const createPopoverDismiss = (id, title, content, customClass) => (
    <Popover id={id} className={customClass}>
      <Popover.Header as="h3">{title}</Popover.Header>
      <Popover.Body>{content}</Popover.Body>
    </Popover>
  );

  const createPopoverDisable = (id, title, customClass) => (
    <Popover id={id} className={customClass}>
      <Popover.Body>{title}</Popover.Body>
    </Popover>
  );

  const popoverPrimary = (
    <Popover id="popover-primary">
      <Popover.Body>
        This popover is used to provide details about this icon.
      </Popover.Body>
    </Popover>
  );

  const popoverSecondary = (
    <Popover id="popover-secondary">
      <Popover.Body>
        This popover is used to provide information about this icon.
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Popovers</h4>
          </div>
        </div>
        <div className="row">
          {/* Default Popovers */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Default Popovers</h5>
              </div>
              <div className="card-body">
                <div className="btn-list popover-list">
                  <OverlayTrigger
                    trigger="click" // You can change this to 'hover', 'focus', or 'click'
                    placement="top"
                    overlay={popoverTop}
                  >
                    <Link
                      tabIndex={0}
                      className="btn btn-outline-primary btn-wave"
                    >
                      Popover Top
                    </Link>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={popoverRight}
                  >
                    <Link
                      tabIndex={0}
                      className="btn btn-outline-primary btn-wave"
                    >
                      Popover Right
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popoverBottom}
                  >
                    <Link
                      tabIndex={0}
                      className="btn btn-outline-primary btn-wave"
                    >
                      Popover Bottom
                    </Link>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click" // You can change this to 'hover', 'focus', or 'click'
                    placement="left"
                    overlay={popoverLeft}
                  >
                    <Link
                      tabIndex={0}
                      className="btn btn-outline-primary btn-wave"
                    >
                      Popover Left
                    </Link>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>
          {/* /Default Popovers */}
          {/* Basic Popovers */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Basic Popovers</h5>
              </div>
              <div className="card-body">
                <div className="btn-list popover-list">
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={popoverTitle}
                  >
                    <button className="btn btn-primary" type="button">
                      Click to toggle popover
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="focus"
                    placement="top"
                    overlay={popover1}
                  >
                    <Link
                      className="example-popover btn btn-primary"
                      tabIndex={0}
                    >
                      Dismissible popover
                    </Link>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={popover2}
                  >
                    <button
                      className="example-popover btn btn-primary"
                      type="button"
                    >
                      On Hover Tooltip
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>
          {/* /Basic Popovers */}
          {/* Colored Headers */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Colored Headers</h5>
              </div>
              <div className="card-body">
                <div className="btn-list popover-list">
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={createPopover(
                      "popover-header-primary",
                      "Color Header",
                      "Popover with primary header.",
                      "header-primary"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-wave"
                    >
                      Header Primary
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={createPopover(
                      "popover-header-secondary",
                      "Color Header",
                      "Popover with secondary header.",
                      "header-secondary"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-wave"
                    >
                      Header Secondary
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={createPopover(
                      "popover-header-info",
                      "Color Header",
                      "Popover with info header.",
                      "header-info"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-info btn-wave"
                    >
                      Header Info
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="left"
                    overlay={createPopover(
                      "popover-header-warning",
                      "Color Header",
                      "Popover with warning header.",
                      "header-warning"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-wave"
                    >
                      Header Warning
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={createPopover(
                      "popover-header-success",
                      "Color Header",
                      "Popover with success header.",
                      "header-success"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-success btn-wave"
                    >
                      Header Success
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={createPopover(
                      "popover-header-danger",
                      "Color Header",
                      "Popover with danger header.",
                      "header-danger"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-wave"
                    >
                      Header Danger
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>
          {/* /Colored Headers */}
          {/* Colored Popovers */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Colored Popovers</h5>
              </div>
              <div className="card-body">
                <div className="btn-list popover-list">
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={createPopoverDark(
                      "popover-primary",
                      "Color Background",
                      "Popover with primary background.",
                      "popover-primary"
                    )}
                  >
                    <button type="button" className="btn btn-primary btn-wave">
                      Primary
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={createPopoverDark(
                      "popover-secondary",
                      "Color Background",
                      "Popover with secondary background.",
                      "popover-secondary"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary btn-wave"
                    >
                      Secondary
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={createPopoverDark(
                      "popover-info",
                      "Color Background",
                      "Popover with info background.",
                      "popover-info"
                    )}
                  >
                    <button type="button" className="btn btn-info btn-wave">
                      Info
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="left"
                    overlay={createPopoverDark(
                      "popover-warning",
                      "Color Background",
                      "Popover with warning background.",
                      "popover-warning"
                    )}
                  >
                    <button type="button" className="btn btn-warning btn-wave">
                      Warning
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={createPopoverDark(
                      "popover-success",
                      "Color Background",
                      "Popover with success background.",
                      "popover-success"
                    )}
                  >
                    <button type="button" className="btn btn-success btn-wave">
                      Success
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={createPopoverDark(
                      "popover-danger",
                      "Color Background",
                      "Popover with danger background.",
                      "popover-danger"
                    )}
                  >
                    <button type="button" className="btn btn-danger btn-wave">
                      Danger
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={createPopoverDark(
                      "popover-teal",
                      "Color Background",
                      "Popover with teal background.",
                      "popover-teal"
                    )}
                  >
                    <button type="button" className="btn btn-teal btn-wave">
                      Teal
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="left"
                    overlay={createPopoverDark(
                      "popover-purple",
                      "Color Background",
                      "Popover with purple background.",
                      "popover-purple"
                    )}
                  >
                    <button type="button" className="btn btn-purple btn-wave">
                      Purple
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>
          {/* /Colored Popovers */}
          {/* Light Colored Popovers */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Light Colored Popovers</h5>
              </div>
              <div className="card-body">
                <div className="btn-list popover-list">
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={createPopoverLight(
                      "popover-primary-light",
                      "Light Background",
                      "Popover with light primary background.",
                      "popover-primary-light"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-soft-primary btn-wave"
                    >
                      Primary
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={createPopoverLight(
                      "popover-secondary-light",
                      "Light Background",
                      "Popover with light secondary background.",
                      "popover-secondary-light"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-soft-secondary btn-wave"
                    >
                      Secondary
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={createPopoverLight(
                      "popover-info-light",
                      "Light Background",
                      "Popover with light info background.",
                      "popover-info-light"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-soft-info btn-wave"
                    >
                      Info
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="left"
                    overlay={createPopoverLight(
                      "popover-warning-light",
                      "Light Background",
                      "Popover with light warning background.",
                      "popover-warning-light"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-soft-warning btn-wave"
                    >
                      Warning
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={createPopoverLight(
                      "popover-success-light",
                      "Light Background",
                      "Popover with light success background.",
                      "popover-success-light"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-soft-success btn-wave"
                    >
                      Success
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={createPopoverLight(
                      "popover-danger-light",
                      "Light Background",
                      "Popover with light danger background.",
                      "popover-danger-light"
                    )}
                  >
                    <button
                      type="button"
                      className="btn btn-soft-danger btn-wave"
                    >
                      Danger
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>
          {/* /Light Colored Popovers */}
          {/* Dismissible Popovers */}
          <div className="col-xl-6">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div className="card-title">Dismissible Popovers</div>
              </div>
              <div className="card-body d-flex flex-wrap justify-content-between">
                <OverlayTrigger
                  trigger="focus"
                  placement="top"
                  overlay={createPopoverDismiss(
                    "popover-dismiss-top",
                    "Dismissible popover",
                    "And here's some amazing content. It's very engaging. Right?"
                  )}
                >
                  <button type="button" className="btn btn-primary m-1">
                    Popover Dismiss
                  </button>
                </OverlayTrigger>

                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={createPopoverDismiss(
                    "popover-dismiss-right",
                    "Dismissible popover",
                    "And here's some amazing content. It's very engaging. Right?"
                  )}
                >
                  <button type="button" className="btn btn-secondary m-1">
                    Popover Dismiss
                  </button>
                </OverlayTrigger>

                <OverlayTrigger
                  trigger="focus"
                  placement="bottom"
                  overlay={createPopoverDismiss(
                    "popover-dismiss-bottom",
                    "Dismissible popover",
                    "And here's some amazing content. It's very engaging. Right?"
                  )}
                >
                  <button type="button" className="btn btn-info m-1">
                    Popover Dismiss
                  </button>
                </OverlayTrigger>

                <OverlayTrigger
                  trigger="focus"
                  placement="left"
                  overlay={createPopoverDismiss(
                    "popover-dismiss-left",
                    "Dismissible popover",
                    "And here's some amazing content. It's very engaging. Right?"
                  )}
                >
                  <button type="button" className="btn btn-warning m-1">
                    Popover Dismiss
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          {/* /Dismissible Popovers */}
          {/* Disabled Popovers */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header justify-content-between">
                <div className="card-title">Disabled Popover</div>
              </div>
              <div className="card-body">
                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="auto"
                  overlay={createPopoverDisable(
                    "popover-disabled",
                    "Disabled popover"
                  )}
                >
                  <span className="d-inline-block">
                    <button className="btn btn-primary" type="button" disabled>
                      Disabled button
                    </button>
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          {/* /Disabled Popovers */}
          {/* Icon Popovers */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header justify-content-between">
                <div className="card-title">Icon Popovers</div>
              </div>
              <div className="card-body">
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  overlay={popoverPrimary}
                >
                  <Link className="me-4">
                    <AlertCircle className="text-primary" />
                  </Link>
                </OverlayTrigger>

                <OverlayTrigger
                  trigger="click"
                  placement="left"
                  overlay={popoverSecondary}
                >
                  <Link className="me-4">
                    <HelpCircle className="text-secondary" />
                  </Link>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          {/* /Icon Popovers */}
        </div>
      </div>
    </div>
  );
};

export default Popovers;
