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
  inline: {
    display: 'inline-block',
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

let questions = [
	{id: 1, prompt:  'Place an adverb. For example: boldly; quickly; patiently.',     placeholder: 'mostly'},
	{id: 2, prompt:  'What is your best friend\'s name?',                             placeholder: 'Joe'},
	{id: 3, prompt:  'What sport do you and your best friend like to play together?', placeholder: 'soccer'},
	{id: 4, prompt:  'What verb do you do with your best friend',                     placeholder: 'bounce',},
	{id: 5, prompt:  'What is an adjective of a person you do not like?',             placeholder: 'mean',},
	{id: 6, prompt:  'Write some person\'s name you do not like',                     placeholder: 'Bob',},
	{id: 7, prompt:  'What is a adjective of this person you do not like?',           placeholder: 'strong',},
	{id: 8, prompt:  'What is something that you have (singular)?',                   placeholder: 'ball',},
	{id: 9, prompt:  'Place a noun.',                                                 placeholder: 'skyscraper',},
	{id: 10, prompt: 'Place an adjective to a dirty sock',                            placeholder: 'dirty',},
	{id: 11, prompt: 'What is your favorite thing to drink?',                         placeholder: 'pop',}
];

function getQuestions() {
	return questions;
}

class VerticalLinearStepper extends React.Component {
  constructor(props) {
		super(props);
		for (var i = 0; i < questions.length; i++) {
			this.state.answers.push({ id: questions[i].id, answer: ''})
		}
	}

	state = {
		activeStep: 0,
		completed: new Set(),
		skipped: new Set(),
		answers: [],
  };

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

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

	handleChange = (id, e) => {
		var newState = this.state;
		newState.answers[id - 1].answer = e.target.value;
		this.setState({
			answers: newState.answers
		});
	}

	handleComplete = (answer) => {
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
		} else {
			let activeStep = this.totalSteps();
			this.setState({
				activeStep,
			});
		}
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
									<StepLabel>
										{this.state.completed.has(question.id-1) ? question.prompt+' (Completed)' : question.prompt}
									</StepLabel>
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
										value={this.state.answers[index].answer}
										onChange={(e) => this.handleChange(question.id, e)}
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
											{activeStep !== questions.length
												&& (this.state.completed.has(this.state.activeStep)
												&& (!this.allStepsCompleted()) ?
												(
													<Button
														variant="raised"
														color="primary"
														onClick={this.handleNext}
														className={classes.button}
													>
														Next
													</Button>
												) : (
													<Button
														className={classes.button}
														variant="raised" color="primary"
														// onClick={this.handleComplete}
														onClick={() => this.handleComplete("sdf")}
														value="{question.answer}"
													>
														{this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Question'}
													</Button>
												)
											)}
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {this.completedSteps() === this.totalSteps() && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All questions completed - you are finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
				)}

				{this.completedSteps() === this.totalSteps() ? 'Completed' : 'Incomplete'}

				<hr/>

				{this.state.answers.map((question, index) => {
					return (
						<div key={question.id}>
							{question.answer}
						</div>
					)
				})}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);