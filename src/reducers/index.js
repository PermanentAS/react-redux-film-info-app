let initialState = {
  data: [],
  typeOfUpdate: "add",
  updateFilm: [
    {
      id: "",
      Title: "",
      ReleaseYear: "",
      Format: "",
      Stars: ""
    }
  ],
  dataCopy: []
};

const reducer = (state = initialState, action) => {
  const deleteFilm = id => {
    return state.data.filter(item => {
      return item.id !== id;
    });
  };

  const searchFilm = id => {
    return state.data.filter(item => {
      return item.id === id;
    });
  };

  const filterByTitle = str => {
    return state.dataCopy.filter(item => {
      return (
        item.Title.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) !== -1
      );
    });
  };

  const filterByActors = str => {
    return state.dataCopy.filter(item => {
      return (
        item.Stars.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) !== -1
      );
    });
  };

  const sortingByAlphabet = () => {
    return state.data.sort((a, b) => {
      let nameA = a.Title.toLowerCase(),
        nameB = b.Title.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  };

  const updateFilm = (data)  => {
    let itemForUpdate = state.data.find((item) => item.id === data.id )
    itemForUpdate = {
      id: data.id,
      Title: data.Title,
      ReleaseYear: data.ReleaseYear,
      Format: data.Format,
      Stars: data.Stars
    }
    const filteredArray = state.data.filter((item) => item.id !== data.id)
    return [itemForUpdate, ...filteredArray]
  }

  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        data: [...action.payload],
        dataCopy: [...action.payload]
      };
    case "FILM_DELETE_SUCCESS":
      return {
        ...state,
        data: [...deleteFilm(action.payload)],
        dataCopy: [...deleteFilm(action.payload)]
      };
    case "FILM_ADD_SUCCESS":
      return {
        ...state,
        data: [action.payload, ...state.data],
        dataCopy: [action.payload, ...state.data],
        typeOfUpdate: null
      };
    case "FILM_UPDATE_SUCCESS":
      return {
        ...state,
        data: updateFilm(action.payload),
        dataCopy: updateFilm(action.payload),
        typeOfUpdate: null
      };
    case "ADD_FILM":
      return {
        ...state,
        ...action.payload
      };
    case "UPDATE_FILM":
      return {
        ...state,
        updateFilm: searchFilm(action.payload),
        typeOfUpdate: "update"
      };
    case "FILTER_BY_TITLE":
      return {
        ...state,
        data: [...filterByTitle(action.payload)]
      };
    case "FILTER_BY_ACTORS":
      return {
        ...state,
        data: [...filterByActors(action.payload)]
      };
    case "SORTING_BY_ALPHABET":
      return {
        ...state,
        data: [...sortingByAlphabet()]
      };
    case "CANCEL_ADD_OR_UPDATE_EVENT_HANDLER":
      return {
        ...state,
        typeOfUpdate: "add"
      };

    default:
      return state;
  }
};

export default reducer;
