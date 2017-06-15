import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import PrimaryAddressMutation from 'js/mutations/userSetPrimaryAddress';
import EditFormModal from './EditForm';

const styles = {
  container: {
    minWidth: 200,
    minHeight: 137
  },
  title: {
    marginTop: 15,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'normal',
    color: '#aaa'
  },
  headerButton: {
    float: 'right',
    position: 'relative',
    top: -12,
  }
};

class AddressItem extends Component {
  state = {
    openPop: false,
    openEditModal: false,
  };

  static contextTypes = {
    snackbar: PropTypes.object
  };

  handlePopOpen = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openPop: true,
      anchorEl: event.currentTarget,
    });
  };

  handlePopClose = () => {
    this.setState({ openPop: false });
  };

  handleEditOpen = () => {
    this.setState({
      openPop: false,
      openEditModal: true
    });
  };

  handleEditClose = () => {
    this.setState({ openEditModal: false });
  };

  handleSetAddressPrimaryClick = (event, address) => {
    if (this.props.disabled) {
      event.preventDefault();
      return;
    }

    Relay.Store.commitUpdate(
      new PrimaryAddressMutation({
        user: this.props.user,
        address
      }),
      {
        onFailure: transaction => console.log(transaction.getError()),
        onSuccess: () => {
          this.handlePopClose();
          this.context.snackbar.open(`Adresa ${address.name} ${address.surname} bola nastavená ako primárna!`);
        }
      }
    );
  };

  handleDelete = () => { };


  render() {
    const address = this.props.address;
    return (
      <div className="box" style={styles.container}>
        <div style={styles.title}>
          {address.name} {address.surname}
          <IconButton
            style={styles.headerButton}
            tooltip="Možnosti"
            onTouchTap={this.handlePopOpen}
          >
            <NavigationExpandMoreIcon />
            <Popover
              open={this.state.openPop}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handlePopClose}
            >
              <Menu>
                <MenuItem
                  primaryText="Nastaviť ako primárnu"
                  disabled={address.primary}
                  onClick={event => this.handleSetAddressPrimaryClick(event, address)}
                />
                <Divider />
                <MenuItem
                  primaryText="Upraviť"
                  onClick={this.handleEditOpen}
                />
                <MenuItem
                  primaryText="Zmazať"
                  onClick={this.handleDelete}
                />
              </Menu>
            </Popover>
          </IconButton>
          <br />
          {!address.primary || <span style={styles.subtitle}>(Nastavená ako primárna)</span>}
        </div>
        <p>
          {address.street}
          <br />
          {address.city}, {address.zip}
        </p>
        <p>Telefón: {address.phone}</p>

        <EditFormModal
          isOpen={this.state.openEditModal}
          handleClose={this.handleEditClose}
        />
      </div>
    );
  }
}

export default Relay.createContainer(AddressItem, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${PrimaryAddressMutation.getFragment('user')}
      }
    `,
    address: () => Relay.QL`
      fragment on Address {
        ${PrimaryAddressMutation.getFragment('address')}
        primary
        name
        surname
        phone
        street
        city
        zip
      }
    `
  }
});

