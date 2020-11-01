import { createTheme } from 'arwes';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const elem = (document.compatMode === "CSS1Compat") ? 
	document.documentElement :
	document.body;

const height = elem.clientHeight;
//const width = elem.clientWidth;

const maxH = ( height - 162 ) + "px";

const theme = createTheme();
theme.animTime = 500;

const dataServer = "http://localhost:9000/data/";

export { dataServer, maxH, theme, lorem };
