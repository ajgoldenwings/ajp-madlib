import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

let questions = [
	{id: 1, prompt:  'Place an adverb. For example: boldly; quickly; patiently.',     placeholder: 'mostly',     answer: ''},
	{id: 2, prompt:  'What is your best friend\'s name?',                             placeholder: 'Joe',        answer: ''},
	{id: 3, prompt:  'What sport do you and your best friend like to play together?', placeholder: 'soccer',     answer: ''},
	{id: 4, prompt:  'What verb do you do with your best friend',                     placeholder: 'bounce',     answer: ''},
	{id: 5, prompt:  'What is an adjective of a person you do not like?',             placeholder: 'mean',       answer: ''},
	{id: 6, prompt:  'Write some person\'s name you do not like',                     placeholder: 'Bob',        answer: ''},
	{id: 7, prompt:  'What is a adjective of this person you do not like?',           placeholder: 'strong',     answer: ''},
	{id: 8, prompt:  'What is something that you have (singular)?',                   placeholder: 'ball',       answer: ''},
	{id: 9, prompt:  'Place a noun.',                                                 placeholder: 'skyscraper', answer: ''},
	{id: 10, prompt: 'Place an adjective to a dirty sock',                            placeholder: 'dirty',      answer: ''},
	{id: 11, prompt: 'What is your favorite thing to drink?',                         placeholder: 'pop',        answer: ''}
];

function getSteps() {
	return questions;
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
		const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((question, index) => {
            return (
              <Step key={question.id}>
                <StepLabel>{question.prompt}</StepLabel>
								<StepContent>
									<TextField
										id="full-width"
										InputLabelProps={{
											shrink: true,
										}}
										placeholder={question.placeholder}
										fullWidth
										margin="normal"
										value={question.answer}
									/>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);