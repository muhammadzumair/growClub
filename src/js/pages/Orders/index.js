import React, { Component } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { grey600, pink500 } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';

import OrdersTable from './OrdersTable';
import NewOrderModal from './NewOrder';

const styles = {
  navigation: {
    fontSize: 17,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block'
  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20
  },
  paper: {
    padding: 30,
    marginBottom: 30
  },
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
  }
};

class Page extends Component {
  state = {
    openOderModal: false,
  };

  handleOpen = () => {
    this.setState({ openOderModal: true });
  };

  handleClose = () => {
    this.setState({ openOderModal: false });
  };

  render() {
    return (
      <div>
        <h3 style={styles.navigation}>Objednávky</h3>

        <div className="row">
          <div className="col-lg-12">
            <FloatingActionButton
              style={styles.floatingActionButton}
              backgroundColor={pink500}
              onTouchTap={this.handleOpen}
            >
              <ContentAdd />
            </FloatingActionButton>

            <Paper style={styles.paper}>
              <h3 style={styles.title}>Objednávky</h3>
              <OrdersTable orders={this.props.viewer.me.orders} />
            </Paper>
          </div>
        </div>

        <NewOrderModal
          isOpen={this.state.openOderModal}
          handleClose={this.handleClose}
          viewer={this.props.viewer}
        />
      </div>
    );
  }
}


export default Relay.createContainer(Page, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        me {
          orders {
            ${OrdersTable.getFragment('orders')}
          }
        }
        ${NewOrderModal.getFragment('viewer')}        
      }
    `
  }
});
