import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { X, Phone, Send } from "react-feather";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToogleHeader } from "../../core/redux/action";
import { RotateCcw, ChevronUp } from "react-feather";

const Audiocall = () => {
  const [addClass, setAddClass] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const handleShowClass = () => {
    setAddClass(true);
  };

  const handleShowremoveClass = () => {
    setAddClass(false);
  };

  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header d-flex justify-content-end">
          <div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link data-bs-toggle="tooltip" data-bs-placement="top">
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-xl-12">
                <div className="conference-meet-group">
                  <div
                    className={
                      addClass ? "meeting-list add-meeting" : "meeting-list"
                    }
                  >
                    {/* Horizontal View */}
                    <div className="join-contents horizontal-view fade-whiteboard">
                      <div className="join-video audio-calls user-active">
                        <div className="audio-call-group">
                          <ul>
                            <li className="active">
                              <div className="avatar ">
                                <ImageWithBasePath
                                  src="assets/img/avatar/avatar-2.jpg"
                                  className="rounded-circle"
                                  alt="image"
                                />
                                <div className="more-icon">
                                  <Link to="#">
                                    <i className="feather feather-radio" />
                                  </Link>
                                </div>
                              </div>
                              <div className="user-audio-call">
                                <h5>Mark Villiams</h5>
                              </div>
                            </li>
                            <li>
                              <div className="avatar ">
                                <ImageWithBasePath
                                  src="assets/img/users/user-16.jpg"
                                  className="rounded-circle"
                                  alt="image"
                                />
                                <div className="more-icon audio-more-icon">
                                  <Link to="#" className="other-mic-off">
                                    <i className="bx bx-microphone" />
                                  </Link>
                                </div>
                              </div>
                              <div className="user-audio-call">
                                <h5>Benjamin</h5>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="record-time">
                          <span>40:12</span>
                        </div>
                        <div
                          className="meet-drop meet-mutes-bottom"
                          onClick={handleShowClass}
                        >
                          <ul>
                            <li>
                              <Link to="#" id="show-message">
                                <i className="bx bx-message-alt-dots" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* /Horizontal View */}
                  </div>
                  <div
                    id="chat-room"
                    className={
                      addClass
                        ? "right-user-side chat-rooms theiaStickySidebar mb-2 open-chats"
                        : "right-user-side chat-rooms theiaStickySidebar mb-2"
                    }
                  >
                    <Scrollbars>
                      <div className=" slime-grp">
                        <div className="left-chat-title">
                          <div className="chat-title">
                            <h4>Message</h4>
                          </div>
                          <div
                            className="contact-close_call"
                            onClick={handleShowremoveClass}
                          >
                            <Link
                              to="#"
                              className="close_profile close_profile4"
                            >
                              <X />
                            </Link>
                          </div>
                        </div>
                        <div className="card-body-blk slimscroll  p-0">
                          <div className="chat-msg-blk ">
                            <div className="chats">
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-01.jpg"
                                  className="dreams_chat"
                                  alt="image"
                                />
                              </div>
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>Hi Everyone.!</h4>
                                </div>
                                <div className="chat-profile-name d-flex justify-content-end">
                                  <h6>10:00 AM</h6>
                                </div>
                              </div>
                            </div>
                            <div className="chats chats-right">
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>
                                    Good Morning..! Today we have meeting about
                                    the new product.
                                  </h4>
                                </div>
                                <div className="chat-profile-name text-end">
                                  <h6>
                                    <i className="bx bx-check-double" /> 10:00
                                  </h6>
                                </div>
                              </div>
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-02.jpg"
                                  className=" dreams_chat"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="chats">
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-01.jpg"
                                  className=" dreams_chat"
                                  alt="image"
                                />
                              </div>
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>Hi.! Good Morning all.</h4>
                                </div>
                                <div className="chat-profile-name d-flex justify-content-end">
                                  <h6>10:00 AM</h6>
                                </div>
                              </div>
                            </div>
                            <div className="chats">
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-01.jpg"
                                  className=" dreams_chat"
                                  alt="image"
                                />
                              </div>
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>Nice..which category it belongs to?</h4>
                                </div>
                                <div className="chat-profile-name d-flex justify-content-end">
                                  <h6>10:00 AM</h6>
                                </div>
                              </div>
                            </div>
                            <div className="chats">
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-01.jpg"
                                  className=" dreams_chat"
                                  alt="image"
                                />
                              </div>
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>
                                    Great.! This is the second new product that
                                    comes in this week.
                                  </h4>
                                </div>
                                <div className="chat-profile-name d-flex justify-content-end">
                                  <h6>10:00 AM</h6>
                                </div>
                              </div>
                            </div>
                            <div className="chats">
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-01.jpg"
                                  className=" dreams_chat"
                                  alt="image"
                                />
                              </div>
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>Hi.! Good Morning all.</h4>
                                </div>
                                <div className="chat-profile-name d-flex justify-content-end">
                                  <h6>10:00 AM</h6>
                                </div>
                              </div>
                            </div>
                            <div className="chats">
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-01.jpg"
                                  className=" dreams_chat"
                                  alt="image"
                                />
                              </div>
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>Nice..which category it belongs to?</h4>
                                </div>
                                <div className="chat-profile-name d-flex justify-content-end">
                                  <h6>10:00 AM</h6>
                                </div>
                              </div>
                            </div>
                            <div className="chats chats-right">
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>
                                    Good Morning..! Today we have meeting about
                                    the new product.
                                  </h4>
                                </div>
                                <div className="chat-profile-name text-end">
                                  <h6>
                                    <i className="bx bx-check-double" /> 10:00
                                  </h6>
                                </div>
                              </div>
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-02.jpg"
                                  className="dreams_chat"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="chats">
                              <div className="chat-avatar">
                                <ImageWithBasePath
                                  src="assets/img/users/user-01.jpg"
                                  className=" dreams_chat"
                                  alt="image"
                                />
                              </div>
                              <div className="chat-content">
                                <div className="message-content">
                                  <h4>
                                    Great.! This is the second new product that
                                    comes in this week.
                                  </h4>
                                </div>
                                <div className="chat-profile-name d-flex justify-content-end">
                                  <h6>10:00 AM</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat-footer">
                            <form>
                              <div className="smile-col comman-icon">
                                <Link to="#">
                                  <i className="far fa-smile" />
                                </Link>
                              </div>
                              <div className="attach-col comman-icon">
                                <Link to="#">
                                  <i className="fas fa-paperclip" />
                                </Link>
                              </div>
                              <div className="micro-col comman-icon">
                                <Link to="#">
                                  <i className="bx bx-microphone" />
                                </Link>
                              </div>
                              <input
                                type="text"
                                className="form-control chat_form"
                                placeholder="Enter Message....."
                              />
                              <div className="send-chat comman-icon">
                                <Link to="#">
                                  {/* <i data-feather="send" /> */}
                                  <Send />
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Scrollbars>
                  </div>
                </div>
                <div className="meet-call-menu-blk">
                  <div className="video-call-action">
                    <ul className="nav">
                      <li>
                        <Link to="#" className="mute-bt ">
                          <i className="bx bx-microphone" />
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="call-end">
                          <Phone />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="bx bx-video-off" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Audiocall;
