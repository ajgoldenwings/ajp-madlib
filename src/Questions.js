import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  paper: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
  },
});

class Questions extends React.Component {
  render() {
		const { classes } = this.props;

		return (
			<div>
				{this.props.questions.map(option => (
					<Paper className={classes.paper}>
						<Grid container wrap="nowrap">
							<Grid item>
								<Avatar>{option.id}</Avatar>
							</Grid>
							<Grid item xs>
								<Typography>{option.prompt}</Typography>
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
									placeholder={option.placeholder}
									fullWidth
									margin="normal"
								/>
							</Grid>
						</Grid>
					</Paper>
				))}
			</div>
    );
  }
}

export default withStyles(styles)(Questions);