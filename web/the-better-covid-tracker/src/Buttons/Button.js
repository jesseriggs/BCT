import React, { Component } from 'react';
import { Button, SoundsProvider, createSounds, withSounds } from 'arwes';

const ButtonSounds={
	shared:{volume:1,},
	players:{
		deploy:{
			sound:{src:['static/sound/deploy.mp3']}
		},
		expand:{
			sound:{src:['static/sound/expand.mp3']}
		},
		logo:{
			sound:{src:['static/sound/logo.mp3']}
		},
	}
};

const buttonSounds = createSounds(ButtonSounds);

const SubmitButton = withSounds()(props=>(
	<Button
		type={"submit"}
		onClick={()=>{props.sounds.expand.play()}}
		{...props}>Submit</Button>
));

const MenuButton = withSounds()(props=>(
	<Button
		onClick={()=>{props.sounds.deploy.play()}}>Menu</Button>
));

class Buttons extends Component
{
	render(){
		const children = this.props.children;
		return(
			<SoundsProvider sounds={buttonSounds}>
				{children}
			</SoundsProvider>
		);
	}
}

export { Buttons, MenuButton, SubmitButton };
