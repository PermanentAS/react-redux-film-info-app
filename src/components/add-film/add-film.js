import React, { useState } from "react";
import { Card, Form, ButtonToolbar, Button } from "react-bootstrap";
import { filmAdded, filmUpdated, cancelHandle } from "./../../actions";
import uuidv1 from "uuid/v1";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const AddFilm = ({
  data,
  updateFilm,
  filmUpdated,
  filmAdded,
  typeOfUpdate,
  cancelHandle
}) => {
  const [idx, setIdx] = useState(typeOfUpdate === "update" ? updateFilm[0].id : uuidv1());
  const [title, setTitle] = useState(updateFilm[0].Title);
  const [year, setYear] = useState(updateFilm[0].ReleaseYear);
  const [format, setFormat] = useState("VHS");
  const [actors, setActors] = useState(updateFilm[0].Stars);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (title !== "" && year >= 1850 && year <= 2025) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const titleValidate = titleVal => {
    const repeatedValues = data.filter(item => item.Title === titleVal);

    if (typeOfUpdate === "add" && repeatedValues.length > 0) {
      setTitle("");
    }
    if (typeOfUpdate === "update" && repeatedValues.length > 1) {
      return titleVal;
    }

    validateForm();
  };

  const yearValidate = year => {
    if (year < 1850) {
      setYear(1850);
      validateForm();
    }
    if (year > 2025) {
      setYear(2025);
      validateForm();
    }
  };

  const actorsValidate = e => {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      e.preventDefault();
    }
  };

  return (
    <Card className="text-left font-weight-bold m-3 p-3">
      <Card.Header style={{ fontSize: "2rem" }}>
        {typeOfUpdate === "update" ? "Update" : "Add new"} film
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput0">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value={ idx } disabled />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Blazing Saddles..."
              onChange={e => {
                setTitle(e.target.value);
                validateForm();
              }}
              onBlur={e => {
                titleValidate(e.target.value);
                validateForm();
              }}
              value={title}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="1974..."
              onChange={e => {
                setYear(e.target.value);
                validateForm();
              }}
              onBlur={e => {
                yearValidate(e.target.value);
                validateForm();
              }}
              value={year}
              required
              min="1800"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Format</Form.Label>
            <Form.Control
              as="select"
              onChange={e => {
                setFormat(e.target.value);
                validateForm();
              }}
              value={format}
              onBlur={() => validateForm()}
            >
              <option value="VHS">VHS</option>
              <option value="DVD">DVD</option>
              <option value="Blue-Ray">Blue-Ray</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Actors</Form.Label>
            <Form.Control
              type="text"
              placeholder="Humphrey Bogart, Ingrid Bergman..."
              onChange={e => {
                setActors(e.target.value);
              }}
              value={actors}
              pattern="[A-Za-zА-Яа-яЁё]"
              onKeyDown={e => {
                actorsValidate(e);
                validateForm();
              }}
              onBlur={() => validateForm()}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <ButtonToolbar>
        {typeOfUpdate === "update" ? (
          <Link to={process.env.PUBLIC_URL + "/"}>
            <Button
              variant="warning m-3 pl-5 pr-5"
              onClick={() => {
                filmUpdated(idx, title, year, format, actors);
                axios.put(`/data/${idx}`, {
                  id: idx,
                  Title: title,
                  ReleaseYear: year,
                  Stars: actors,
                  Format: format
                });
              }}
            >
              Update
            </Button>
          </Link>
        ) : (
          <Link to={process.env.PUBLIC_URL + "/"}>
            <Button
              variant="primary m-3 pl-5 pr-5"
              onClick={() => {
                filmAdded(idx, title, year, format, actors);
                axios.post(`/data/`, {
                  id: idx,
                  Title: title,
                  ReleaseYear: year,
                  Stars: actors,
                  Format: format
                });
              }}
              // {{isValid ? "null" : "null"}}
              disabled={isValid ? "" : "disabled"}
            >
              Add
            </Button>
          </Link>
        )}

        <Link to={process.env.PUBLIC_URL + "/"}>
          <Button
            variant="danger m-3 pl-5 pr-5"
            onClick={() => {
              setIdx("");
              setTitle("");
              setYear("");
              setFormat("VHS");
              setActors("");
              cancelHandle();
            }}
          >
            Cancel
          </Button>
        </Link>
      </ButtonToolbar>
    </Card>
  );
};

const mapStateToProps = ({ data, updateFilm, typeOfUpdate }) => {
  return {
    data,
    updateFilm,
    typeOfUpdate
  };
};

const mapDispatchToProps = { filmAdded, filmUpdated, cancelHandle };

export default connect(mapStateToProps, mapDispatchToProps)(AddFilm);
