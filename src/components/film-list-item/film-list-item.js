import React, { useState } from "react";
import { Card, Badge, ButtonToolbar, Button } from "react-bootstrap";
import { deleteFilm, updateFilm } from "./../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios"

const FilmListItem = ({ item, deleteFilm, updateFilm }) => {
  const [showInfo, setShowInfo] = useState(false);

  const { Title, ReleaseYear, Format, Stars, id } = item;
  const SomeInfo = () => {
    return (
      <Card.Subtitle className="mb-2 mt-3 text-muted font-weight-normal">
        Info: Lorem ipsum dolor sit amet, iriure complectitur deterruisset eos
        ad, tempor consetetur pro cu. Eam pertinax salutandi ut, eos ne etiam
        vivendo appetere. Vel at rebum inciderint, homero euripidis at sed. Ex
        mea inimicus instructior, vocent ancillae referrentur per te, id vim
        feugiat placerat. Melius timeam ullamcorper nec ex, wisi legendos eum
        no. Pro oporteat eleifend at.
      </Card.Subtitle>
    );
  };

  return (
    <Card className="text-left font-weight-bold m-3 " styles={{display: "flex"}}>
      <Card.Img variant="left" src={`https://picsum.photos/1000/200?random=${id}`} />
      <Card.Body>
        <Card.Title>
          {Title} <Badge variant="secondary">{Format}</Badge>{" "}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          Year: {ReleaseYear}
        </Card.Subtitle>
        <Card.Text>
          Stars: {Stars}
          {showInfo ? SomeInfo() : null}
        </Card.Text>
        <hr />
        <ButtonToolbar>
          <Button
            variant="danger mr-3"
            onClick={() => {
              deleteFilm(id);
              axios.delete(`/data/${id}`)
            }}
          >
            Delete
          </Button>
          <Link to={process.env.PUBLIC_URL + "/add"}>
            <Button
              variant="warning mr-3"
              onClick={() => {
                updateFilm(id);
              }}
            >
              Update Info
            </Button>
          </Link>
          <Button
            variant="info"
            onClick={() => {
              setShowInfo(!showInfo);
            }}
          >
            {showInfo ? "Hide" : "Show"} Info
          </Button>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  );
};

const mapDispatchToProps = {
  deleteFilm,
  updateFilm
};

export default connect(
  undefined,
  mapDispatchToProps
)(FilmListItem);
