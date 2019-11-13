import React from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchData } from "./actions";

import Header from "./components/header";
import FilmList from "./components/film-list";
import AddFilm from "./components/add-film";
import UploadForm from "./components/upload-form";

class App extends React.Component {

  componentDidMount() {
    fetch("/data")
      .then(res => res.json())
      .then(data => this.props.fetchData(data))
      .catch(err => err);
  }

  render() {
    console.log(this.props.data);
      return (
        <div className="App">
          <Header />
  
          <Switch>
            <Route
              path={process.env.PUBLIC_URL + "/"}
              component={FilmList}
              exact
            />
            <Route path={process.env.PUBLIC_URL + "/add"} component={AddFilm} />
            <Route path={process.env.PUBLIC_URL + "/upload"} component={UploadForm}/>
            <Route path={process.env.PUBLIC_URL + "/"} />
          </Switch>
        </div>
      );
    
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

const mapDispatchToProps = { fetchData };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
