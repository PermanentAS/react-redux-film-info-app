import React from "react";
import { Navbar, ButtonToolbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFilm } from "./../../actions";

const Header = ({ data, addFilm, typeOfUpdate }) => {
  return (
    <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        FilmInfo App
      </Navbar.Brand>

      {typeOfUpdate === "update" ? null : (
        <ButtonToolbar>
          <Link to={process.env.PUBLIC_URL + "/upload"} className="mr-3">
            <Button variant="primary">Load data from file</Button>
          </Link>

          <Link to={process.env.PUBLIC_URL + "/add"}>
            <Button variant="primary" onClick={() => addFilm(data)}>
              Add new film
            </Button>
          </Link>
        </ButtonToolbar>
      )}
    </Navbar>
  );
};

const mapStateToProps = ({ data, typeOfUpdate }) => {
  return { data, typeOfUpdate };
};

const mapDispatchToProps = { addFilm };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
