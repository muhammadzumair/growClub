import React, { Component } from 'react';
import Relay from 'react-relay';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';


class Orders extends Component {

  render() {
    const {
      orders
    } = this.props;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>VS</TableHeaderColumn>
            <TableHeaderColumn>Produkty</TableHeaderColumn>
            <TableHeaderColumn>Typ platby</TableHeaderColumn>
            <TableHeaderColumn>Dátum objednávky</TableHeaderColumn>
            <TableHeaderColumn>Dátum platby</TableHeaderColumn>
            <TableHeaderColumn>Možnosti</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(item =>
            <TableRow key={item.id}>
              <TableRowColumn>{item.id}</TableRowColumn>
              <TableRowColumn>{item.variable_symbol}</TableRowColumn>
              <TableRowColumn>
                {item.products.map(product => (
                  <span key={product.id}>
                    {product.name}
                  </span>
                ))}
              </TableRowColumn>
              <TableRowColumn>{item.payment_type}</TableRowColumn>
              <TableRowColumn>{moment(item.date_order).format('LLL')}</TableRowColumn>
              <TableRowColumn>{moment(item.date_confirmed).format('LLL')}</TableRowColumn>
              <TableRowColumn>
                <FlatButton label="Zobraziť" />
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}


export default Relay.createContainer(Orders, {
  fragments: {
    orders: () => Relay.QL`
      fragment on Order @relay(plural: true) {
        id
        date_order
        date_confirmed
        payment_type
        variable_symbol
        products {
          id
          name
        }
      }
    `
  }
});
