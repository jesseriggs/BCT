import { Page, PageController } from './Pages.js';

test(
	'Page creation and assignment with empty path',
	() => {
		const pageName  = "test";
		const path      = "";
		const content   = "test";
		const showLinks = false;
		const showInput = false;
		const page      = new Page
			(
				pageName,
				path,
				content,
				showLinks,
				showInput
			);
		expect( page.pageName ).toEqual( pageName );
		expect( page.path ).toEqual( path );
		expect( page.content() ).toEqual( content );
		expect( page.showLinks ).toEqual( showLinks );
		expect( page.showInput ).toEqual( showInput );
		expect( page.key ).toEqual( 0 );
	}
);

test(
	'Page creation and assignment with non-empty path',
	() => {
		const pageName  = "asdf";
		const path      = "/asdf/";
		const content   = "asdf";
		const showLinks = true;
		const showInput = true;
		const page      = new Page
			(
				pageName,
				path,
				content,
				showLinks,
				showInput
			);
		expect( page.pageName ).toEqual( pageName );
		expect( page.path ).toEqual( path );
		expect( page.content() ).toEqual( content );
		expect( page.showLinks ).toEqual( showLinks );
		expect( page.showInput ).toEqual( showInput );
		expect( page.key ).toBeTruthy();
	}
);

test(
	'PageController creation and assignment.',
	() => {
		const TEST = "test";
		const pagecontroller = new PageController( TEST );
		expect( pagecontroller.dataController ).toEqual( TEST );
		expect( pagecontroller.pages.Home.pageName ).toEqual( "Home" );
		expect( pagecontroller.pages.Start.pageName ).toEqual( "Start" );
		expect( pagecontroller.pages.About.pageName ).toEqual( "About" );
		expect( pagecontroller.pages[ "404" ].pageName ).toEqual( "404" );
		pagecontroller.setTemplate( TEST );
		expect( pagecontroller.template ).toEqual( TEST );
	}
);
