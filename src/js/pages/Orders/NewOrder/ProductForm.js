import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import {
  FormsyRadio,
  FormsyRadioGroup
} from 'formsy-material-ui';

const style = {
  radioButton: {
    marginTop: 16,
  },
};

class ProductForm extends Component {

  handleSaveFormState = (event) => {
    const isValid = this.refs.form.inputs[0].isValid();
    if (isValid) {
      this.props.saveValues(event);
    }
  };

  render() {
    const products = this.props.viewer.products.edges;
    const selected = this.props.fieldValue || products[0].node.id;

    return (
      <Formsy.Form
        ref="form"
        onChange={this.handleSaveFormState}
      >
        Vyber si balík kreditov
        <FormsyRadioGroup
          name="product"
          defaultSelected={selected}
          validationError="Prosím, vyberte product"
          required
        >
          {products.reduce((memo, { node }) => {
            if (node.active) {
              memo.push(
                <FormsyRadio
                  key={node.id}
                  value={node.id}
                  label={`${node.price} ${node.unit} - ${node.name}`}
                  style={style.radioButton}
                />
              );
            }
            return memo;
          }, [])}
        </FormsyRadioGroup>
      </Formsy.Form>
    );
  }
}


export default Relay.createContainer(ProductForm, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        products(first: 5) {
          edges {
            node {
              id
              active
              name
              price
              unit
            }
          }
        }
      }
    `
  }
});

