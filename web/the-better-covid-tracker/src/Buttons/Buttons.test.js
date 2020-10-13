import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Buttons, MenuButton, SubmitButton } from './Button.js';
import { createTheme } from 'arwes';

const theme = createTheme();

it( "Buttons ( button container ) renders without crashing", ()=>{
	const div     = document.createElement( 'div' );
	const buttons = ( <Buttons theme = { theme }><div></div></Buttons> );
	ReactDOM.render( buttons, div );
});

it( "MenuButton renders without crashing", ()=>{
	const div     = document.createElement( 'div' );
	const mbutton = ( <MenuButton theme = { theme } /> );
	ReactDOM.render( mbutton, div );
});

it( "SubmitButton renders without crashing", ()=>{
	const div     = document.createElement( 'div' );
	const sbutton = ( <SubmitButton /> );
	ReactDOM.render( sbutton, div );
});
