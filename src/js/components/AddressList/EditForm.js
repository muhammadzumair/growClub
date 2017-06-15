import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ThemeDefault from 'js/themes/default';


const style = {
  title: {
    marginBottom: 20,
    backgroundColor: ThemeDefault.palette.primary1Color,
    color: ThemeDefault.palette.alternateTextColor
  }
};


class Edit extends Component {
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
        keyboardFocused={true}
        onTouchTap={this.props.handleClose}
      />
    ];

    return (
      <Dialog
        title="Upraviť adresu"
        titleStyle={style.title}
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.handleClose}
      >
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
          Formulár v príprave
        </div>
      </Dialog>
    );
  }
}


export default Edit;
