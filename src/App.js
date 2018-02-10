import React, { Component } from 'react';
import './App.css';
import { withStyles } from 'material-ui/styles';
import Header from './Header';
import Intro from './Intro';
// import Questions from './Questions';
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
					{/* <Questions questions={questions} /> */}
					<VerticalLinearStepper />
				</div>
      </div>
    );
  }
}

export default withStyles(styles)(App);



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