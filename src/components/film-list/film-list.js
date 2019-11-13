import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import FilmListItem from "./../film-list-item";
import {
  filterByTitle,
  filterByActors,
  sortingByAlphabet
} from "./../../actions";
import Filters from "./../filters";

const FilmList = ({
  data,
  filterByTitle,
  filterByActors,
  sortingByAlphabet
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const renderList = () => {
    return data.map((item, idx) => {
      return <FilmListItem item={item} key={idx} />;
    });
  };

  if (data !== undefined) {
    return (
      <div>
        <Button
          variant="dark"
          size="lg"
          className="mt-3"
          style={{ width: "96%", margin: "20px auto" }}
          block
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          {showFilters ? "Hide" : "Show"} filters
        </Button>
        {showFilters ? (
          <Filters
            filterByTitle={filterByTitle}
            filterByActors={filterByActors}
            sortingByAlphabet={sortingByAlphabet}
          />
        ) : null}
        {renderList()}
      </div>
    );
  }
};

const mapStateToProps = ({ data }) => {
  return { data };
};

const mapDispatchToProps = { filterByTitle, filterByActors, sortingByAlphabet };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmList);
