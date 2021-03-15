import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/main.scss";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter  as Router, Route, Switch} from "react-router-dom";
import Error from "./comp/error-page";
import Main from "./comp/main";

ReactDOM.render(
  <Router>
    <Switch>
    <Route exact path="/">
      <Main/>
    </Route>
      <Route path="/tool">
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Route>
      <Route path="*">
        <Error/>
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
