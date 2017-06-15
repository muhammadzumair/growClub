import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';

class Timeline extends Component {

  state = {
    stepIndex: 0,
  };

  render() {
    const { stepIndex } = this.state;
    return (
      <div style={{ maxWidth: 380, minHeight: 600, padding: 5 }}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
        >
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
              Course 1
            </StepButton>
            <StepContent>
              <p>Completed</p>
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
              Course 2
            </StepButton>
            <StepContent>
              <p>Completed</p>
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 2 })}>
              Course 3
            </StepButton>
            <StepContent>
              <p>Completed</p>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default Timeline;
