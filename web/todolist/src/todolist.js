import React, {Component} from 'react';
import {Button, SoundsProvider, createSounds, withSounds} from 'arwes';
import TodoItems from './todoitems.js';

const FormSounds={
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

const SubmitButton = withSounds()(props=>(
	<Button
		show={props.show}
		animate
		type={"submit"}
		onClick={()=>{props.sounds.expand.play()}}
		{...props}
	>Submit</Button>
));

const MyItems = withSounds()(props=>(
	<TodoItems 
		entries={props.entries}
		delete={props.delete} 
		sounds={props.sounds}
	/>
));

class TodoList extends Component{
	constructor(props){
		super(props);

		this.state = {
			items:[]
		};

		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	addItem(e){
		if(this._inputElement.value !== ""){
			var newItem = {
				text: this._inputElement.value,
				key: Date.now(),
			};
			this.setState((prevState)=>{
				return {
					items: prevState.items.concat(newItem)
				};
			});
		}
		this._inputElement = "";
		console.log(this.state.items);
		e.preventDefault();
	}

	deleteItem(key){
		var filteredItems = this.state.items.filter(function(item){
			return(item.key !== key)
		});
		this.setState({
			items: filteredItems
		});
	}

	render(){
		return(
			<div className={"todolistmain"}>
			  <div className={"header"}>
			   <form onSubmit={this.addItem}>
				<input ref={(a) => this._inputElement = a}
					placeholder="enter task">
				</input>
				<SoundsProvider sounds={createSounds(FormSounds)}>
					<SubmitButton />
				</SoundsProvider>
			   </form>
			  </div>
			  <SoundsProvider sounds={createSounds(FormSounds)}>
			      <MyItems entries={this.state.items}
				delete={this.deleteItem} />
			  </SoundsProvider>
			</div>
		);
	}
}

export {TodoList, FormSounds};
