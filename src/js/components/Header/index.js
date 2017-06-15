import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

import SearchBox from './SearchBox';
import Credits from './Credits';

class Header extends Component {
  static propTypes = {
    styles: PropTypes.object,
    handleChangeRequestNavDrawer: PropTypes.func
  };

  render() {
    const { styles, handleChangeRequestNavDrawer } = this.props;

    const style = {
      appBar: {
        overflow: 'hidden',
      },
      menuButton: {
        marginLeft: 16
      }
    };

    return (
      <div>
        <AppBar
          zDepth={0}
          style={{ ...styles, ...style.appBar }}
          title={
            <SearchBox />
          }
          iconElementLeft={
            <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
              <Menu />
            </IconButton>
          }
          iconElementRight={
            <Credits
              viewer={this.props.viewer}
              credits={this.props.viewer.me.credits}
            />
          }
        />
      </div>
    );
  }
}


export default Relay.createContainer(Header, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        me {
          credits {
            ${Credits.getFragment('credits')}
          }
        }
        ${Credits.getFragment('viewer')}
      }
    `
  }
});
