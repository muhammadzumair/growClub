import React, { Component } from 'react';
import Relay from 'react-relay';
import { Tabs, Tab, Paper } from 'material-ui';
import ProfileHeader from 'js/components/ProfileHeader';
import OrdersTable from 'js/pages/Orders/OrdersTable';
import Courses from './Courses';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  renderContent() {
    if (this.state.value === 1) {
      return <Courses />;
    } else if (this.state.value === 2) {
      return <OrdersTable orders={this.props.viewer.me.orders} />;
    }
    return <Courses />;
  }

  render() {
    const styles = {
      paper: {
        margin: '-20px -20px 20px -20px'
      },
      tab: {
        width: 100,
        color: '#333',
      }
    };

    return (
      <div>
        <Paper
          rounded={false}
          zDepth={1}
          style={styles.paper}
        >
          <ProfileHeader
            profileTitle="Hamza Anwer"
            profileSubtitle="React Native Dev"
          />
          <Tabs
            inkBarStyle={{ width: '50%', marginLeft: 130, paddingTop: 3 }}
            tabItemContainerStyle={{ marginLeft: 130, width: 200, backgroundColor: '#fff' }}
            value={this.state.activeTab}
            onChange={this.handleChange}
          >
            <Tab style={styles.tab} label="Courses" value={1}></Tab>
            <Tab style={styles.tab} label="Orders" value={2}></Tab>
          </Tabs>
        </Paper>
        {this.renderContent()}
      </div>
    );
  }
}


export default Relay.createContainer(Profile, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        me {
          orders {
            ${OrdersTable.getFragment('orders')}
          }
        }
      }
    `
  }
});
