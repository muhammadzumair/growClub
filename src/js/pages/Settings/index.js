import React, { Component } from 'react';
import Relay from 'react-relay';
import { typography } from 'material-ui/styles';
import { grey600 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Address from 'js/components/AddressList';

const styles = {
  navigation: {
    fontSize: 17,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block'
  },
  paper: {
    padding: '1px 0px 2px 20px'
  }
};

class SettingsPage extends Component {

  render() {
    const me = this.props.viewer.me;
    const addresses = me.addresses;

    return (
      <div>
        <h3 style={styles.navigation}>Nastavenia</h3>

        <Address.List columns={3}>
          {addresses.map((item, key) => (
            <Paper key={key} style={styles.paper}>
              <Address.Item
                key={key}
                user={me}
                address={item}
              />
            </Paper>
          ))}

          <Address.AddButton
            user={me}
          />
        </Address.List>
      </div>
    );
  }
}


export default Relay.createContainer(SettingsPage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        me {
          ${Address.Item.getFragment('user')}
          ${Address.AddButton.getFragment('user')}
          addresses {
            ${Address.Item.getFragment('address')}
          }
        }
      }
    `
  }
});
