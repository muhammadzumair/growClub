import React, { Component } from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import profilePhoto from 'assets/images/profile-avatar.png';

class UserBanner extends Component {
  render() {
    const styles = {
      div: {
        padding: '40px 15px',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
      },
      span: {
        paddingTop: 20,
        display: 'block',
      }
    };

    const user = this.props.me;
    const avatar = profilePhoto;

    return (
      <div style={styles.div}>
        <Avatar src={avatar}
                size={60}
                style={styles.icon} />
        <span style={styles.span}>
          {user.login}
        </span>
      </div>
    );
  }
}


export default Relay.createContainer(UserBanner, {
  fragments: {
    me: () => Relay.QL`
      fragment on User {
        login
      }
    `
  }
});
