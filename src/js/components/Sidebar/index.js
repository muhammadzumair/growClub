import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Drawer from 'material-ui/Drawer';
import { spacing, typography } from 'material-ui/styles';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ThemeDefault from 'js/themes/default';

// icons
import ProfileIcon from 'material-ui/svg-icons/social/person';
import DashboardIcon from 'material-ui/svg-icons/action/assessment';
import CalendarIcon from 'material-ui/svg-icons/action/event';
import OrderIcon from 'material-ui/svg-icons/content/inbox';
import PowerOffIcon from 'material-ui/svg-icons/action/power-settings-new';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

// mutations
import LogoutMutation from 'js/mutations/authLogout';

import SelectableMenu from './SelectableMenu';
import UserBanner from './UserBanner';


class Sidebar extends Component {
  static propTypes = {
    navDrawerOpen: PropTypes.bool,
    menus: PropTypes.array,
    username: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  logout(event) {
    event.preventDefault();

    Relay.Store.commitUpdate(
      new LogoutMutation({
        viewer: this.props.viewer
      }),
      {
        onSuccess: () => {
          localStorage.removeItem('bearer_token');
          this.context.router.push('/sign-in');
        }
      }
    );
  }

  render() {
    const { navDrawerOpen } = this.props;

    const styles = {
      logo: {
        cursor: 'pointer',
        fontSize: 22,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: ThemeDefault.palette.primary2Color,
        paddingLeft: 30,
        height: 80,
      },
      menuItem: {
        fontSize: 14,
        padding: '15px'
      }
    };


    return (
      <Drawer
        zDepth={1}
        docked={true}
        open={navDrawerOpen}
        containerStyle={{ zIndex: 1100 }}
      >

        <div style={styles.logo}>
          Growclub
        </div>

        <UserBanner me={this.props.viewer.me} />

        <SelectableMenu>
          <ListItem
            value='/profile'
            style={styles.menuItem}
            primaryText="Profile"
            leftIcon={<ProfileIcon />}
          />
          <ListItem
            value='/dashboard'
            style={styles.menuItem}
            primaryText="Prehľad"
            leftIcon={<DashboardIcon />}
          />
          <ListItem
            value='/calendar'
            style={styles.menuItem}
            primaryText="Kalendár"
            leftIcon={<CalendarIcon />}
          />
          <ListItem
            value='/orders'
            style={styles.menuItem}
            primaryText="Objednávky"
            leftIcon={<OrderIcon />}
          />
          <Divider />
          <ListItem
            value='/settings'
            style={styles.menuItem}
            primaryText="Nastavenia"
            leftIcon={<SettingsIcon />}
          />
          <ListItem
            value='/logout'
            style={styles.menuItem}
            primaryText="Odhlásiť sa"
            leftIcon={<PowerOffIcon />}
            onClick={event => this.logout(event)}
          />
        </SelectableMenu>
      </Drawer>
    );
  }
}


export default Relay.createContainer(Sidebar, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${LogoutMutation.getFragment('viewer')}
        me {
          ${UserBanner.getFragment('me')}
        }
      }
    `
  }
});
