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
import TextField from 'material-ui/TextField';


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
    textAlign: 'left',
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    //padding: theme.spacing.unit * 2,
  },
});

const posts = [
  {id: 1, prompt: 'Place an adverb.  For example: boldly; quickly; patiently.',                 placeholder: 'mostly'},
  {id: 2, prompt: 'What is something that you have (singular)?',                                placeholder: 'ball'},
  {id: 3, prompt: 'Place a noun.',                                                              placeholder: 'skyscraper'},
  {id: 4, prompt: 'Write a person\'s na',                                                       placeholder: 'Bob'},
  {id: 5, prompt: 'What is a adjective of " + persons_name + "?',                               placeholder: 'strong'},
  {id: 6, prompt: 'What is an adjective of a person you do not like?',                          placeholder: 'mean'},
  {id: 7, prompt: 'Place an adjective to a dirty sock',                                         placeholder: 'dirty'},
  {id: 8, prompt: 'What is your best friend\'s name?',                                          placeholder: 'Joe'},
  {id: 9, prompt: 'What sport do you and your best friend, " + bf + ", like to play together?', placeholder: 'soccer'},
  {id: 10, prompt: 'What verb do you do with " + b',                                            placeholder: 'bounce'},
  {id: 11, prompt: 'What is your favorite thing to drink?',                                     placeholder: 'pop'}
];

// // Abverb is below
// abverb = prompt("Place an adverb.  For example: boldly; quickly; patiently.", "mostly");
// // Noun is below
//     possession = prompt("What is something that you have (singular)?", "ball");
// // Noun is below
//     noun = prompt("Place a noun.", "skyscraper");
// // Noun is below
//     persons_name = prompt("Write a person's name", "Bob");
// // Adjective is below
//     persons_description = prompt("What is a adjective of " + persons_name + "?", "strong");
// // Adjective is below
//     pd = prompt("What is an adjective of a person you do not like?", "mean");
// // Adjective is below
//     sock = prompt("Place an adjective to a dirty sock", "dirty");
// // Noun is below
//     bf = prompt("What is your best friend's name?", "Joe");
//     sport = prompt("What sport do you and your best friend, " + bf + ", like to play together?", "soccer");
// // Verb is Below
// 	verb = prompt("What verb do you do with " + bf, "bounce");
// // Noun is below
//     drink = prompt("What is your favorite thing to drink?", "pop");

// // Paragragh one
//     document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My friend " + bf + " is like " + persons_name + ".");
//     document.write("&nbsp;&nbsp;They are both " + persons_description + ".");
//     document.write("&nbsp;&nbsp;Unlike " + persons_name + ", " + bf + " has a " + noun + ".");
// 	document.write("&nbsp;&nbsp;If you think about it, " + persons_name + " is not so sweet because " + bf + " has a " + noun + ".");
// 	document.write("&nbsp;&nbsp;Also, " + bf + " is so much <b>" + persons_description + "er</b>, and that makes my " + possession + " rock it's socks off.");
// 	document.write("&nbsp;&nbsp;I know that my " + possession + " might not have socks but if it did, I am just saying, I know " + bf + " would take the " + possession + "'s socks and turn them into " + sock + " socks and then give the " + sock + " socks to " + persons_name + " as a gift!<br/>");

// // Paragragh two
//     document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anyways, " + persons_name + " is a " + pd + " person that has to be with my best friend and I all the time, especially when we " + verb + " together.&nbsp;&nbsp;");
// 	document.write("But we like to have some fun with this " + pd + " person.");
// 	document.write("&nbsp;&nbsp;For example, we play " + sport + " a lot and when playing we make fun of " + persons_name + "'s clumsy mistakes!");
// 	document.write("&nbsp;&nbsp;We laugh throughout the game of " + sport + ".");
// 	document.write("&nbsp;&nbsp;After a game of much fun, " + bf + " and I take it back to my place and crack open a couple of " + drink + "s and sit back reflecting on the " + sport + " game.");
// 	document.write("&nbsp;&nbsp;We " + abverb + " point out how poor " + persons_name + "'s performance was.<br/>");

// // Paragragh three
// 	document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + bf + " is totally not like " + persons_name + " because they do not " + verb + " like us.");
// 	document.write("&nbsp;&nbsp;We have been always using our " + verb + "ing skills against " + persons_name + ", the " + pd + " head.");
// 	document.write("&nbsp;&nbsp;Sometimes " + bf + " and I are good friends with " + persons_name + ".");
// 	document.write("&nbsp;&nbsp;We " + abverb + " point out to our friend " + persons_name + " how they did not play " + sport + " that good or not good at all.");
// 	document.write("&nbsp;&nbsp;As a solution we tell " + persons_name + " as polite as we can that they can not play " + sport + ", therefore we tell " + persons_name + " straight up that they suck at " + sport + " and should not play that sport.");
// 	document.write("&nbsp;&nbsp;After telling a solution to his problems we start laughing at our " + pd + " friend and tell " + persons_name + " that " + bf + " gave them a sock from my " + possession + "'s feet, and made it a " + sock + " sock as a gift, to him.");
// 	document.write("&nbsp;&nbsp;Yea that's right- as a prank!");
// 	document.write("&nbsp;&nbsp;We got " + persons_name + " good.");



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
								<Typography>Place an adverb.  For example: boldly; quickly; patiently.</Typography>
							</Grid>
						</Grid>
						<Grid container wrap="nowrap">
							<Grid item>
								<Avatar></Avatar>
							</Grid>
							<Grid item xs>
								<TextField
									id="full-width"
									InputLabelProps={{
										shrink: true,
									}}
									placeholder="mostly"
									fullWidth
									margin="normal"
								/>
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
								<Grid item>
									<Avatar></Avatar>
								</Grid>
								<Grid item xs>
									<TextField
										id="full-width"
										InputLabelProps={{
											shrink: true,
										}}
										placeholder="Ball"
										fullWidth
										margin="normal"
									/>
								</Grid>
							</Grid>
					</Paper>
				</div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
