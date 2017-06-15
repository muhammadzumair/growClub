import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import ThemeDefault from 'js/themes/default';
import {
  blue300 as companyColor,
  lightGreen400 as personColor
} from 'material-ui/styles/colors';
import moment from 'moment';

// icons
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import AddShopingIcon from 'material-ui/svg-icons/content/add';
import CompanyIcon from 'material-ui/svg-icons/action/work';
import FaceIcon from 'material-ui/svg-icons/action/face';

import NewOrderModal from 'js/pages/Orders/NewOrder';

const textColor = ThemeDefault.appBar.textColor;

class Credits extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    openMenu: false,
    openOderModal: false,
  };

  handleOpenMenu = (value) => {
    this.setState({
      openMenu: value,
    });
  };

  handleOpen = () => {
    this.setState({
      openMenu: false,
      openOderModal: true
    });
  };

  handleClose = () => {
    this.setState({ openOderModal: false });
  };

  render() {
    const style = {
      iconsRightContainer: {
        marginLeft: 20
      },
      icon: {
        color: textColor,
        padding: 12
      },
      amount: {
        color: textColor,
        fontSize: '16px',
        position: 'relative',
        top: -18
      }
    };

    let amount = 0;
    const today = moment();
    const credits = this.props.credits.reduce((memo, item) => {
      const expire = moment(item.date_expire);
      if (expire > today) {
        let avatar = null;
        amount += item.amount;

        if (item.type === 'default') {
          avatar = <Avatar icon={<CompanyIcon />} backgroundColor={companyColor} />;
        } else {
          avatar = <Avatar icon={<FaceIcon />} backgroundColor={personColor} />;
        }

        memo.push((
          <ListItem
            key={item.id}
            leftAvatar={avatar}
            primaryText={`${item.amount} KR`}
            secondaryText={`vypršia v ${expire.format('LLL')}`}
          />
        ));
      }
      return memo;
    }, []);

    return (
      <div style={style.iconsRightContainer}>
        <IconMenu
          iconButtonElement={
            <FlatButton style={style.amount} label={`${amount} KR`} />
          }
          open={this.state.openMenu}
          onRequestChange={this.handleOpenMenu}
        >
          <Subheader inset={true}>Dostupné kredity</Subheader>
          {credits}
          <Divider inset={true} />
          <ListItem
            leftIcon={<AddShopingIcon />}
            primaryText="Objednať"
            onTouchTap={this.handleOpen}
          />
        </IconMenu>
        <MoneyIcon style={style.icon} />
        <NewOrderModal
          isOpen={this.state.openOderModal}
          handleClose={this.handleClose}
          viewer={this.props.viewer}
        />
      </div>
    );
  }
}


export default Relay.createContainer(Credits, {
  fragments: {
    credits: () => Relay.QL`
      fragment on Credit @relay(plural: true) {
        id
        amount
        type
        date_expire
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${NewOrderModal.getFragment('viewer')}        
      }
    `
  }
});
