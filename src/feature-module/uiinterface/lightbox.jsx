import React from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImageWithBasePath from "../../core/img/imagewithbasebath";

const Lightboxes = () => {
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsopen] = React.useState(false);

  const imageItems = [
    { img: "assets/img/img-01.jpg" },
    { img: "assets/img/img-02.jpg" },
  ];

  const imageItemsTwo = [
    { img: "assets/img/img-03.jpg" },
    { img: "assets/img/img-04.jpg" },
    { img: "assets/img/img-05.jpg" },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Light Box</h4>
          </div>
        </div>
        <div className="row">
          {/* Lightbox */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Single Image Lightbox</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {imageItems.map((item, index) => (
                    <div className="col-md-4 mb-2 mb-md-0" key={index}>
                      <Link to="#" className="image-popup">
                        <ImageWithBasePath
                          src={item.img}
                          className="img-fluid"
                          alt="image"
                          onClick={() => setOpen(true)}
                        />
                      </Link>
                    </div>
                  ))}
                  <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={[
                      { src: "assets/img/img-01.jpg" },
                      { src: "assets/img/img-02.jpg" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Lightbox */}
          {/* Lightbox */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Image with Description</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {imageItemsTwo.map((item, index) => (
                    <div className="col-md-4 mb-2 mb-md-0" key={index}>
                      <Link
                        to="#"
                        className="image-popup-desc"
                        data-title="Title 01"
                        data-description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit"
                      >
                        <ImageWithBasePath
                          src={item.img}
                          className="img-fluid"
                          alt="work-thumbnail"
                          onClick={() => setIsopen(true)}
                        />
                      </Link>
                    </div>
                  ))}

                  <Lightbox
                    open={isOpen}
                    close={() => setIsopen(false)}
                    slides={[
                      { src: "assets/img/img-03.jpg" },
                      { src: "assets/img/img-04.jpg" },
                      { src: "assets/img/img-05.jpg" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /Lightbox */}
        </div>
      </div>
    </div>
  );
};

export default Lightboxes;
