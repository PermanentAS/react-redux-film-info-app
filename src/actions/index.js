const fetchData = (data) => {
  return {
    type: "FETCH_DATA_SUCCESS",
    payload: data
  };
};

const deleteFilm = id => {
  return {
    type: "FILM_DELETE_SUCCESS",
    payload: id
  };
};

const cancelHandle = () => {
  return {
    type: "CANCEL_ADD_OR_UPDATE_EVENT_HANDLER"
  };
};

const addFilm = data => {
  return {
    type: "ADD_FILM",
    payload: {
      typeOfUpdate: "add",
      updateFilm: [
        {
          id: data.length !== 0 ? `${+data[data.length - 1].id + 1}` : "1",
          Title: "",
          ReleaseYear: "",
          Format: "",
          Stars: ""
        }
      ]
    }
  };
};

const updateFilm = id => {
  return {
    type: "UPDATE_FILM",
    payload: id
  };
};

const filmAdded = (id, title, year, format, actors) => {
  return {
    type: "FILM_ADD_SUCCESS",
    payload: {
      id,
      Title: title,
      ReleaseYear: year,
      Format: format,
      Stars: actors
    }
  };
};

const filmUpdated = (id, title, year, format, actors) => {
  return {
    type: "FILM_UPDATE_SUCCESS",
    payload: {
      id: id,
      Title: title,
      ReleaseYear: year,
      Format: format,
      Stars: actors
    }
  };
};

const filterByTitle = str => {
  return {
    type: "FILTER_BY_TITLE",
    payload: str
  };
};

const filterByActors = str => {
  return {
    type: "FILTER_BY_ACTORS",
    payload: str
  };
};

const sortingByAlphabet = () => {
  return {
    type: "SORTING_BY_ALPHABET"
  };
};

export {
  fetchData,
  deleteFilm,
  addFilm,
  filmAdded,
  updateFilm,
  filmUpdated,
  filterByTitle,
  filterByActors,
  sortingByAlphabet,
  cancelHandle
};
