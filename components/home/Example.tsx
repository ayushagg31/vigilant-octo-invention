import React from "react";

const Example = () => {
  return (
    <div className="block">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://picsum.photos/seed/picsum/1280/960"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://picsum.photos/id/219/96/96"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">Divya Prakash Jha</p>
              <p className="subtitle is-6">@dpjha</p>
            </div>
          </div>

          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris. <a>@ayagarwal</a>.<a href="#">#ai</a>{" "}
            <a href="#">#nice</a>
            <br />
            {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
