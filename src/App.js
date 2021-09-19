import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeIndex from "./components/home";
import DeviceMain from "./components/devices";
import "./App.css";

function App(props) {
  let { authToken } = props;
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {authToken ? <Redirect to="/devices" /> : <HomeIndex />}
        </Route>
        <Route exact path="/devices">
          {authToken ? <DeviceMain /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    authToken: state.homeReducer.authToken,
  };
};

export default connect(mapStateToProps)(App);
