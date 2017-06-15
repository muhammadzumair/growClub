import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';


class AddressForm extends Component {

  render() {
    const company = this.props.company;

    return (
      <Formsy.Form>
        Patríš k firme
        <br />
        {company.map((item, key) => (
          <span key={key}>ICO: {item.ico}</span>
        ))}
      </Formsy.Form>
    );
  }
}


export default Relay.createContainer(AddressForm, {
  fragments: {
    company: () => Relay.QL`
      fragment on Company @relay(plural: true) {
        ico
      }
    `
  }
});

