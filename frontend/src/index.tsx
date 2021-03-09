import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline>
      <App />
    </CssBaseline>
  </BrowserRouter>,
  document.getElementById('root')
);
