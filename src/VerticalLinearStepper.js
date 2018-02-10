import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepButton, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  completed: {
    marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		paddingTop: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit,
		paddingRight: theme.spacing.unit * 2,
    display: 'inline-block',
	},
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  root: {
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

function getQuestions() {
	return questions;
}

class VerticalLinearStepper extends React.Component {
  // state = {
  //   activeStep: 0,
  //   completed: {},
	// }
	state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set(),
  };

  // allStepsCompleted() {
  //   return this.completedSteps() === this.totalSteps();
	// }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  // completedSteps() {
  //   return Object.keys(this.state.completed).length;
	// }

  completedSteps() {
    return this.state.completed.size;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  totalSteps = () => {
    return getQuestions().length;
  }

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getQuestions();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  }

  // handleBack = () => {
  //   const { activeStep } = this.state;
  //   this.setState({
  //     activeStep: activeStep - 1,
  //   });
  // }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  }

  handleSkip = () => {
    const { activeStep } = this.state;
    const skipped = new Set(this.state.skipped);
    skipped.add(activeStep);
    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped,
    });
  }

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  }

  // handleComplete = () => {
  //   const { completed } = this.state;
  //   completed[this.state.activeStep] = true;
  //   this.setState({
  //     completed,
  //   });
  //   this.handleNext();
  // }

  handleComplete = () => {
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    this.setState({
      completed,
    });
    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext();
    }
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
    });
  }

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  skippedSteps() {
    return this.state.skipped.size;
  }

  render() {
    const { classes } = this.props;
    const questions = getQuestions();
		const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
					{questions.map((question, index) => {
						// alternativeLabel
						const props = {};
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={question.id}>
								<StepButton
									onClick={this.handleStep(index)}
									completed={this.isStepComplete(index)}
								>
									<StepLabel>{question.prompt}</StepLabel>
								</StepButton>

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
                      {/* <Button
                        variant="raised"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
											</Button> */}
											{activeStep !== questions.length &&
												(this.state.completed.has(this.state.activeStep) ? (
													<div>
														<Button
															variant="raised"
															color="primary"
															onClick={this.handleNext}
															className={classes.button}
														>
															Next
														</Button>
														<Typography variant="caption" className={classes.completed}>
															Step {activeStep + 1} already completed
														</Typography>
													</div>
												) : (
													<Button className={classes.button} variant="raised" color="primary" onClick={this.handleComplete}>
														{this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
													</Button>
													)
												)
											}
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === questions.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All questions completed - you&quot;re finished</Typography>
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