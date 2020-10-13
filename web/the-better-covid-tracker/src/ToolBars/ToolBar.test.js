/**
 * Test Suite for ToolBar
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ToolBar } from './ToolBar.js';

it( "ToolBar renders without crashing", ()=>{
	const div     = document.createElement( 'div' );
	const toolbar = ( <ToolBar><div></div></ToolBar> );
	ReactDOM.render( toolbar, div );
});
