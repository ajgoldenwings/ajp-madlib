import React from 'react';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  intro: {
    flexGrow: 1,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

class Intro extends React.Component {
  render() {
		const { classes } = this.props;

		return (
			<div>
				<p className={classes.intro}> <i>A reproduction of the <a href="http://studentweb.stcloudstate.edu/pean0906/sites/CSCI/Labs/lab3/lab3.html" target="_blank" rel="noopener noreferrer"> original</a>. View the source on <a href="https://github.com/ajgoldenwings/ajp-madlib" rel="noopener noreferrer" target="_blank">GitHub.</a></i>
				</p>
			</div>
    );
  }
}

export default withStyles(styles)(Intro);