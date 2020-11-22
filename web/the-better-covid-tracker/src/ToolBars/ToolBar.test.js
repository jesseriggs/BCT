/**
 * Test Suite for ToolBar
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ToolBar } from './';

const controller = {
	getStates   : () => { return [] },
	getCounties : () => { return [] }
};

it( "ToolBar renders without crashing", ()=>{
	const div     = document.createElement( 'div' );
	const toolbar = ( <ToolBar controller = { controller } >
				<div></div></ToolBar> );
	ReactDOM.render( toolbar, div );
});
