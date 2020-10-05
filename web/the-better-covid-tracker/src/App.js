import React from 'react';
import {HomePage} from './Pages/Home/index.js';
import {Template} from './Templates/Template.js';

const App = ()=>{
	return(
	  <React.StrictMode>
	    <Template><HomePage /></Template>
	  </React.StrictMode>
	);
};

export{App};
