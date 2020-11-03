import React from 'react';
import { NotFoundPage } from './404/index.js';
import { AboutPage } from './About/index.js';
import { HomePage } from './Home/index.js';
import { StartPage } from './Start/index.js';

const getKey = ( str ) => {
	var key = 0;
	if( str.length === 0 )
		return key;
	for( var i = 0; i < str.length; i++ ){
		key += str.charAt( i ) * 31 + 19;
	}
	return key;
};

class Page
{
	constructor(
		    pageName,
		    path,
		    content,
		    showLinks,
		    showInput )
	{
		this.pageName  = pageName;
		this.path      = path;
		this.showLinks = showLinks;
		this.showInput = showInput;
		this.content   = ()=>{ return content };
		this.key       = getKey( path );
	}
}

class PageController
{
	constructor( dataController )
	{
		this.dataController = dataController;
		this.template       = false;
		this.pages          = {
			"Home"  : new Page(
				"Home",
				"/Home",
				( <HomePage datacontroller =
					{ dataController } /> ),
				true,
				true
			),
			"Start" : new Page(
				"Start",
				"/",
				( <StartPage
					datacontroller = { dataController }
					buttonLink = "/Home"
				    />
				),
				false,
				false
			),
			"About" : new Page(
				"About",
				"/About",
				( <AboutPage /> ),
				true,
				false
			),
			"404" : new Page(
				"404",
				"/404",
				( <NotFoundPage /> ),
				true,
				false
			)
		};
	}
	getLinks()
	{
		var links = {};
		Object.values( this.pages ).forEach( ( page ) => {
			links.[ page.path ] = page.pageName;
		});
		return links;
	}
	getHrefs()
	{
		var refs = [];
		Object.values( this.pages ).forEach( ( page ) => {
			if( page.path === "/" || page.path === "/404" )
				return;
			refs.push(
				{
					pageName : page.pageName,
					path     : page.path,
					key      : page.key
				}
			);
		});
		return refs;
	}
	getPage()
	{
		var pageName = this.getLinks()[ window.location.pathname ];
		if( pageName === undefined )
			window.location.assign( "/404" );
		return this.pages[ pageName ];
	}
	setPage( page )
	{
		if( !this.template ) return;
		this.template.setPage( page );
		this.template.setInput( page.showInput );
		this.template.setLinks( page.showLinks );
	}
	setTemplate( template )
	{
		this.template = template;
	}
}

export { Page, PageController }
