import React from 'react';
import {HomePage} from './Pages/Home/index.js';
import {Template} from './Templates/Template.js';

const App = ()=>{
	return(
		<Template headerText = "Home" ><HomePage /></Template>
	);
};

export{App};
