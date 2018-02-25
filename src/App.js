import React, { Component } from 'react';
import './App.css';
import { withStyles } from 'material-ui/styles';
import Header from './Header';
import Intro from './Intro';
import VerticalLinearStepper from './VerticalLinearStepper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
});

class App extends Component {
  render() {
		const { classes } = this.props;

    return (
      <div className="App">
				<Header />
				<Intro />
				<div className={classes.root}>
					<VerticalLinearStepper />
				</div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
