/**
 * Test Suite for Template
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Template, DescriptionPane, MainContainer, Footer } from './Template.js';

// Test Footer
it( "Footer runs without crashing", ()=>{
	const div = document.createElement('div');
	const footer =(<Footer><div></div></Footer>);
	ReactDOM.render(footer, div);
});
