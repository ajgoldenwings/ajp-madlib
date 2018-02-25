import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepButton, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
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
});

let questions = [
	{id: 1, prompt:  'Place an adverb. For example: boldly; quickly; patiently.',     placeholder: 'mostly'},
	{id: 2, prompt:  'What is your best friend\'s name?',                             placeholder: 'Joe'},
	{id: 3, prompt:  'What sport do you and your best friend like to play together?', placeholder: 'soccer'},
	{id: 4, prompt:  'What verb do you do with your best friend',                     placeholder: 'bounce',},
	{id: 5, prompt:  'What is an adjective of this friend?',                          placeholder: 'strong',},
	{id: 6, prompt:  'Write some person\'s name you do not like',                     placeholder: 'Bob',},
	{id: 7, prompt:  'What is a adjective of this person you do not like?',           placeholder: 'mean',},
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

	handleComplete = (key) => {
		if (key !== undefined && key !== "Enter")
			return;

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

	renderAnswer(index) {
		return this.state.answers[index].answer !== '' ? this.state.answers[index].answer : questions[index].placeholder;
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
				{this.completedSteps() !== this.totalSteps() && (
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
											onKeyPress={(e) => this.handleComplete(e.key)}
											autoFocus={index === activeStep}
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
															onClick={() => this.handleComplete()}
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
				)}

				{this.completedSteps() === this.totalSteps() && (
					<Typography>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My friend&nbsp;
						{this.renderAnswer(1)}{/* bf */}
						&nbsp;is like&nbsp;
						{this.renderAnswer(5)}{/* persons_name */}
						.&nbsp;&nbsp;They are both&nbsp;
						{this.renderAnswer(4)}{/* persons_description */}
						.&nbsp;&nbsp;Unlike&nbsp;
						{this.renderAnswer(5)}{/* persons_name */}
						,&nbsp;
						{this.renderAnswer(1)}{/* bf */}
						&nbsp;has a&nbsp;
						{this.renderAnswer(8)}{/* noun */}
						.&nbsp;&nbsp;If you think about it,&nbsp;
						{this.renderAnswer(5)}
						&nbsp;is not so sweet because&nbsp;
						{this.renderAnswer(1)}
						&nbsp;has a&nbsp;
						{this.renderAnswer(8)}
						.&nbsp;&nbsp;Also,&nbsp;
						{this.renderAnswer(1)}
						&nbsp;is so much&nbsp;
						<b>{this.renderAnswer(4)}er</b>
						, and that makes my&nbsp;
						{this.renderAnswer(7)}
						&nbsp;rock it's socks off.&nbsp;&nbsp;I know that my&nbsp;
						{this.renderAnswer(7)}
						&nbsp;might not have socks but if it did, I am just saying, I know&nbsp;
						{this.renderAnswer(1)}
						&nbsp;would take the&nbsp;
						{this.renderAnswer(7)}
						's socks and turn them into&nbsp;
						{this.renderAnswer(9)}
						&nbsp;socks and then give the&nbsp;
						{this.renderAnswer(9)}
						&nbsp;socks&nbsp;
						{this.renderAnswer(5)}
						&nbsp;as a gift!<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anyways,
						{this.renderAnswer(5)}
						&nbsp;is a&nbsp;
						{this.renderAnswer(6)}
						&nbsp;person that has to be with my best friend and I all the time, especially when we&nbsp;
						{this.renderAnswer(3)}
						&nbsp;together.&nbsp;&nbsp;But we like to have some fun with this&nbsp;
						{this.renderAnswer(6)}
						&nbsp;person.&nbsp;&nbsp;For example, we play&nbsp;
						{this.renderAnswer(2)}
						&nbsp;a lot and when playing we make fun of&nbsp;
						{this.renderAnswer(5)}
						's clumsy mistakes!&nbsp;&nbsp;We laugh throughout the game of&nbsp;
						{this.renderAnswer(2)}
						.&nbsp;&nbsp;After a game of much fun,&nbsp;
						{this.renderAnswer(1)}
						&nbsp;and I take it back to my place and crack open a couple of&nbsp;
						{this.renderAnswer(10)}
						s and sit back reflecting on the&nbsp;
						{this.renderAnswer(2)}
						&nbsp;game&nbsp;&nbsp;We&nbsp;
						{this.renderAnswer(0)}
						&nbsp;point out how poor&nbsp;
						{this.renderAnswer(5)}
						's performance was.<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						{this.renderAnswer(1)}
						&nbsp;is totally not like&nbsp;
						{this.renderAnswer(5)}
						&nbsp;because they do not&nbsp;
						{this.renderAnswer(3)}
						&nbsp;like us.&nbsp;&nbsp;We have been always using our&nbsp;
						{this.renderAnswer(3)}
						ing skills against&nbsp;
						{this.renderAnswer(5)}
						, the&nbsp;
						{this.renderAnswer(6)}
						&nbsp;head.&nbsp;&nbsp;Sometimes&nbsp;
						{this.renderAnswer(1)}
						&nbsp;and I are good friends with&nbsp;
						{this.renderAnswer(5)}
						.&nbsp;&nbsp;We&nbsp;
						{this.renderAnswer(0)}
						&nbsp;point out to our friend&nbsp;
						{this.renderAnswer(5)}
						&nbsp;how they did not play&nbsp;
						{this.renderAnswer(2)}
						&nbsp;that good or not good at all.&nbsp;&nbsp;As a solution we tell&nbsp;
						{this.renderAnswer(5)}
						&nbsp;as polite as we can that they can not play&nbsp;
						{this.renderAnswer(2)}
						, therefore we tell&nbsp;
						{this.renderAnswer(5)}
						&nbsp;straight up that they suck at&nbsp;
						{this.renderAnswer(2)}
						&nbsp;and should not play that {this.renderAnswer(2)}.&nbsp;&nbsp;After telling a solution to his problems we start laughing at our&nbsp;
						{this.renderAnswer(6)}
						&nbsp;friend and tell&nbsp;
						{this.renderAnswer(5)}
						&nbsp;that&nbsp;
						{this.renderAnswer(1)}
						&nbsp;gave them a sock from my&nbsp;
						{this.renderAnswer(7)}
						's feet, and made it a&nbsp;
						{this.renderAnswer(9)}
						&nbsp;sock as a gift, to them.&nbsp;&nbsp;Yea that's right- as a prank!&nbsp;&nbsp;We got&nbsp;
						{this.renderAnswer(5)}
						&nbsp;good.
					</Typography>
				)}

				{this.completedSteps() === this.totalSteps() && (
					<div>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
					</div>
				)}
      </div>
    );
  }
}


VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);