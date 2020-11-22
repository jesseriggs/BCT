/**
 * Test Suite for Template
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Template, DescriptionPane, MainContainer, Footer } from './';
import { ThemeProvider, createTheme } from 'arwes';

const theme = createTheme();

// Test Footer
it( "Footer runs without crashing", ()=>{
	const div = document.createElement('div');
	const footer =(
		<ThemeProvider theme = { theme }>
			<Footer><div></div></Footer>
		</ThemeProvider>);
	ReactDOM.render(footer, div);
});
