import React from 'react';
import ReactDOM from 'react-dom';
import './todolist.css';
import {TodoList} from './todolist.js';
import {Arwes, Button, ThemeProvider, withSounds, createTheme } from 'arwes';

const DeployButton = withSounds()(props=>(
	<Button
		show={props.show}
		animate
		onClick={()=>{props.transition()}}
		{...props}
	/>
));

const mainpage=()=>{
	return(
	   <ThemeProvider theme={createTheme()}>
	    <Arwes classes={{pattern:"todopattern"}} animate show>
		<audio
			style={{display:"none"}}
			src="static/sound/start.mp3"
			controls autoPlay
		/>
		<TodoList />
	    </Arwes>
	   </ThemeProvider>
	);
}

const transitionmain=()=>{
	ReactDOM.render(
		mainpage(),
		document.getElementById('root')
	);
}

const intropage=(transition)=>{
	return(
	   <ThemeProvider theme={createTheme()}>
	    <Arwes classes={{pattern:"todopattern"}} animate show>
		<div class="todolistmain" 
		    style={{"background-color":"rgba(2,17,21,0.8)"}}>
			<h1>Todolist</h1>
			<p>Todolist uses sounds.</p>
			<DeployButton 
				transition={transition}
				>Start</DeployButton>
		</div>
	    </Arwes>
	   </ThemeProvider>
	);
}

ReactDOM.render(
  intropage(transitionmain),
  document.getElementById('root')
);
