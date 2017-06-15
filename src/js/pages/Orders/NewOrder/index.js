import React, { Component } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ThemeDefault from 'js/themes/default';
import ProductForm from './ProductForm';
import AddressForm from './AddressForm';
import CompanyForm from './CompanyForm';
import SummaryForm from './SummaryForm';


const style = {
  title: {
    marginBottom: 20,
    backgroundColor: ThemeDefault.palette.primary1Color,
    color: ThemeDefault.palette.alternateTextColor
  }
};


class NewOrder extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    forms: {
      product: null,
      address: null,
      company: null,
      confirm: null,
    }
  };

  /**
   *
   */
  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };


  /**
   *
   */
  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };


  /**
   * s
   */
  handleResetAndClose = () => {
    this.setState({
      finished: false,
      stepIndex: 0,
    });

    return this.props.handleClose();
  };


  saveValues = (fields) => {
    this.setState({
      forms: {
        ...fields
      }
    });
  };

  render() {
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };


    const actions = [
      <FlatButton
        label="Zrušiť"
        primary={false}
        onTouchTap={this.handleResetAndClose}
      />,
      <RaisedButton
        label="Späť"
        disabled={stepIndex === 0}
        onTouchTap={this.handlePrev}
        style={{ marginRight: 12 }}
      />,
      <RaisedButton
        label={stepIndex === 3 ? 'Objednať' : 'Ďalej'}
        primary={true}
        keyboardFocused={true}
        onTouchTap={stepIndex === 3 ? this.handleResetAndClose : this.handleNext}
      />
    ];

    return (
      <Dialog
        title="Objednať kredity"
        titleStyle={style.title}
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.handleResetAndClose}
      >
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Výber produktu</StepLabel>
            </Step>
            <Step>
              <StepLabel>Faktúračna adresa</StepLabel>
            </Step>
            <Step>
              <StepLabel>Zamestnávateľ</StepLabel>
            </Step>
            <Step>
              <StepLabel>Zhrnutie</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {stepIndex === 0 &&
              <ProductForm
                fieldValue={this.state.forms.product}
                saveValues={this.saveValues}
                viewer={this.props.viewer}
              />
            }

            {stepIndex === 1 &&
              <AddressForm
                addresses={this.props.viewer.me.addresses}
              />
            }

            {stepIndex === 2 &&
              <CompanyForm
                company={this.props.viewer.me.companies}
              />
            }

            {stepIndex === 3 &&
              <SummaryForm />
            }
          </div>
        </div>
      </Dialog>
    );
  }
}


export default Relay.createContainer(NewOrder, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        me {
          companies {
            id
            ${CompanyForm.getFragment('company')}
          }
          addresses {
            ${AddressForm.getFragment('addresses')}
          }
        }
        ${ProductForm.getFragment('viewer')}
      }
    `
  }
});

