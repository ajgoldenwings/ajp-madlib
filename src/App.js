import React, { Component } from 'react';
import './App.css';
//import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Header from './Header';
import Intro from './Intro';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    //padding: theme.spacing.unit * 2,
  },
});

class App extends Component {
  render() {
		const { classes } = this.props;
		const message = `Truncation should be conditionally applicable on this long line of text
											as this is a much longer line than what the container can support. `;

    return (
      <div className="App">
				<Header />
				<Intro />
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<Grid container wrap="nowrap">
							<Grid item>
								<Avatar>1</Avatar>
							</Grid>
							<Grid item xs>
								<Typography>{message}</Typography>
							</Grid>
						</Grid>
							<Grid container wrap="nowrap">
								<Grid item></Grid>
								<Grid item xs>
									<Typography>should be input here</Typography>
								</Grid>
							</Grid>
					</Paper>
					<Paper className={classes.paper}>
						<Grid container wrap="nowrap">
							<Grid item>
								<Avatar>2</Avatar>
							</Grid>
							<Grid item xs>
								<Typography>{message}</Typography>
							</Grid>
						</Grid>
							<Grid container wrap="nowrap">
								<Grid item></Grid>
								<Grid item xs>
									<Typography>should be input here</Typography>
								</Grid>
							</Grid>
					</Paper>
				</div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
