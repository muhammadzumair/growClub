import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Formsy from 'formsy-react';
import { FormsyText, FormsyToggle } from 'formsy-material-ui';

import ThemeDefault from 'js/themes/default';
import {
  grey500,
  lightGreen600 as backgroundColor
} from 'material-ui/styles/colors';

import UserAddAddress from 'js/mutations/userAddAddress';

const style = {
  title: {
    marginBottom: 20,
    backgroundColor,
    color: ThemeDefault.palette.alternateTextColor
  },
  checkRemember: {
    style: {
      float: 'left',
      padding: '15px 0'
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  }
};


class AddForm extends Component {

  static contextTypes = {
    snackbar: PropTypes.object
  };

  /**
   * take care of rendering Login form
   *
   * @param styles
   * @returns {XML}
   */
  renderForm() {
    return (
      <Formsy.Form
        ref="form"
        id="formular"
        onValidSubmit={this.handleFormSubmit}
      >

        <FormsyText
          name="name"
          floatingLabelText="Meno"
          fullWidth={true}
          required
        />

        <FormsyText
          name="surname"
          floatingLabelText="Priezvisko"
          fullWidth={true}
          required
        />

        <FormsyText
          name="phone"
          floatingLabelText="Telefón"
          fullWidth={true}
          required
        />

        <FormsyText
          name="street"
          floatingLabelText="Ulica"
          fullWidth={true}
          required
        />

        <FormsyText
          name="city"
          floatingLabelText="Mesto"
          fullWidth={true}
          required
        />

        <FormsyText
          name="zip"
          floatingLabelText="PSČ"
          fullWidth={true}
          required
        />

        <FormsyToggle
          name="primary"
          label="Primárna adresa"
          iconStyle={style.checkRemember.iconStyle}
          labelStyle={style.checkRemember.labelStyle}
          style={style.checkRemember.style}
        />

        <button
          type="submit"
          style={{ display: 'none' }}
          ref={(input) => { this.submitButton = input; }}
        />

      </Formsy.Form>
    );
  }

  handleFormSubmit = (model) => {
    Relay.Store.commitUpdate(
      new UserAddAddress({
        user: this.props.user,
        address: model
      }),
      {
        onFailure: transaction => console.log(transaction.getError()),
        onSuccess: () => {
          this.context.snackbar.open('Nová adresa bola úspešne vytvorená!');
          this.props.handleClose();
        }
      }
    );
  };

  handleModalSubmit = (event) => {
    event.preventDefault();
    this.submitButton.click();
  };


  render() {
    const actions = [
      <FlatButton
        label="Zrušiť"
        primary={false}
        onTouchTap={this.props.handleClose}
      />,
      <RaisedButton
        label="Potvrdiť"
        primary={true}
        onTouchTap={this.handleModalSubmit}
        buttonStyle={{
          backgroundColor
        }}
      />
    ];

    return (
      <Dialog
        title="Pridať novú adresu"
        titleStyle={style.title}
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.handleClose}
      >
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
          {this.renderForm()}
        </div>
      </Dialog>
    );
  }
}


export default Relay.createContainer(AddForm, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${UserAddAddress.getFragment('user')}
      }
    `
  }
});
