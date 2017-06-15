import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';

import Address from 'js/components/AddressList';


class AddressForm extends Component {

  render() {
    const addresses = this.props.addresses;

    return (
      <Formsy.Form>
        Vyber si fakturačnú adresu
        <Address.List columns={2}>
          {addresses.map((item, key) => (
            <Address.Item key={key} address={item} />
          ))}
        </Address.List>
      </Formsy.Form>
    );
  }
}


export default Relay.createContainer(AddressForm, {
  fragments: {
    addresses: () => Relay.QL`
      fragment on Address @relay(plural: true) {
        ${Address.Item.getFragment('address')}
      }
    `
  }
});

