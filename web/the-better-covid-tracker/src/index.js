import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {HomePage} from './Pages/Home/index.js';
import {Template} from './Templates/Template.js';

ReactDOM.render(
  <React.StrictMode>
    <Template><HomePage /></Template>
  </React.StrictMode>,
  document.getElementById('root')
);
