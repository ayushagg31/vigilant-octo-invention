import React from "react";
import Link from "next/link";
import LoginButton from "../home/LoginButton";

function ResponsiveAppBar() {
  return (
    <>
      <nav className="navbar is-black">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://mindgrasp.ai/wp-content/uploads/2023/05/new_logo-Edited.png"
              style={{ background: "#fff" }}
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </a>
          <div
            className="navbar-burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" href={"/"}>
              Home
            </Link>
            <Link className="navbar-item" href={"/chat"}>
              How to use
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a
                className="navbar-link"
                href="https://bulma.io/documentation/overview/start/"
              >
                Docs
              </a>
              <div className="navbar-dropdown is-boxed">
                <a
                  className="navbar-item"
                  href="https://bulma.io/documentation/overview/start/"
                >
                  Overview
                </a>
                <a
                  className="navbar-item"
                  href="https://bulma.io/documentation/overview/modifiers/"
                >
                  Modifiers
                </a>
                <a
                  className="navbar-item"
                  href="https://bulma.io/documentation/columns/basics/"
                >
                  Columns
                </a>
                <a
                  className="navbar-item"
                  href="https://bulma.io/documentation/layout/container/"
                >
                  Layout
                </a>
                <a
                  className="navbar-item"
                  href="https://bulma.io/documentation/form/general/"
                >
                  Form
                </a>
                <hr className="navbar-divider" />
                <a
                  className="navbar-item"
                  href="https://bulma.io/documentation/elements/box/"
                >
                  Elements
                </a>
                <a
                  className="navbar-item is-active"
                  href="https://bulma.io/documentation/components/breadcrumb/"
                >
                  Components
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <a
                    className="bd-tw-button button"
                    data-social-network="Twitter"
                    data-social-action="tweet"
                    data-social-target="https://bulma.io"
                    target="_blank"
                    href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms"
                  >
                    <span className="icon">
                      <i className="fab fa-twitter"></i>
                    </span>
                    <span>Tweet</span>
                  </a>
                </p>
                <p className="control">
                  <a className="button is-primary" href="#">
                    <span className="icon">
                      <i className="fas fa-dollar-sign"></i>
                    </span>
                    <span>Pricing</span>
                  </a>
                </p>
                <LoginButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default ResponsiveAppBar;
