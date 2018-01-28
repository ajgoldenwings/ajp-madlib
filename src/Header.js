import React from 'react';
import logo from './logo.svg';
import './Header.css';
import Grid from 'material-ui/Grid';

class Header extends React.Component {
  render() {
		const messageTitle = `How You Think of Your Best Friend`;
		const messageAuthor = `Anthony Pearson`;

    return (
			<header className="App-header">
				<Grid container wrap="nowrap">
					<Grid item className="App-logo-container">
						<img src={logo} className="App-logo" alt="logo" />
					</Grid>
					<Grid className="Flex-center">
						<div className="App-title"><u>{messageTitle}</u> By {messageAuthor}</div>
					</Grid>
				</Grid>
			</header>
    );
  }
}

export default Header;