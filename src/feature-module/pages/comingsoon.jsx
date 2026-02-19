import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";

const Comingsoon = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds]);

  const formatTime = (time) => {
    // Add leading zero for single-digit numbers
    return time < 10 ? `0${time}` : time;
  };
  return (
    <div className="main-wrapper">
      <div className="comming-soon-pg w-100">
        <div className="coming-soon-box">
          <div className="pos-logo">
            <ImageWithBasePath src="assets/img/logo-small.png" alt />
          </div>
          <span>Our Website is</span>
          <h1>
            <span> COMING </span> SOON{" "}
          </h1>
          <p>
            Please check back later, We are working hard to get everything just
            right.
          </p>
          <ul className="coming-soon-timer">
            <li>
              <span className="days">54</span>days
            </li>
            <li className="seperate-dot">:</li>
            <li>
              <span className="hours">10</span>Hrs
            </li>
            <li className="seperate-dot">:</li>
            <li>
              <span className="minutes">47</span>Min
            </li>
            <li className="seperate-dot">:</li>
            <li>
            <span className="seconds">{formatTime(seconds)}</span>Sec
          </li>
    
          </ul>
          <div className="subscribe-form">
            <div className="mb-3">
              <label className="form-label">Subscribe to get notified!</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
              />
              <Link to className="btn btn-primary subscribe-btn">
                Subscribe
              </Link>
            </div>
          </div>
          <ul className="social-media-icons">
            <li>
              <Link to="#">
                <i className="fab fa-facebook-f" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-instagram" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-twitter" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-pinterest-p" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fab fa-linkedin" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comingsoon;
