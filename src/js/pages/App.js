import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import Header from 'js/components/Header';
import Sidebar from 'js/components/Sidebar';
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth';
import ThemeDefault from 'js/themes/default';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true,
      snackbar: {
        open: false,
        message: ''
      }
    };
  }

  static propTypes = {
    children: PropTypes.element,
    width: PropTypes.number
  };

  static childContextTypes = {
    snackbar: PropTypes.object,
  };

  getChildContext() {
    return {
      snackbar: {
        open: msg => this.handleSnackbarOpen(msg)
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  handleSnackbarOpen = (message) => {
    this.setState({
      snackbar: {
        open: true,
        message
      }
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    });
  };

  render() {
    const { navDrawerOpen } = this.state;
    const paddingSidebarOpen = ThemeDefault.appBar.width;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingSidebarOpen : 0
      },
      container: {
        margin: '20px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingSidebarOpen : 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header viewer={this.props.viewer}
                  styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

          <Sidebar viewer={this.props.viewer}
                   navDrawerOpen={navDrawerOpen} />

          <div style={styles.container}>
            {this.props.children}
          </div>
          <Snackbar
            open={this.state.snackbar.open}
            message={this.state.snackbar.message}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackbarClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const AppUI = withWidth()(App);

export default Relay.createContainer(AppUI, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${Header.getFragment('viewer')}
        ${Sidebar.getFragment('viewer')}
      }
    `,
  }
});
