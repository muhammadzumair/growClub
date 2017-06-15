import React, { Component } from 'react';
import Relay from 'react-relay';
import ContentAdd from 'material-ui/svg-icons/content/add';

import AddFormModal from './AddForm';

const styles = {
  container: {
    margin: '10px 0 0 10px',
    flexGrow: 1,
    border: '5px dashed #bbb',
    flexDirection: 'column',
    cursor: 'pointer',
    color: '#bbb'
  },
  addIcon: {
    color: '#bbb',
    width: 75,
    height: 75
  },
  hover: {
    borderColor: '#777',
    color: '#777',
  }
};

class AddButton extends Component {
  state = {
    hover: false,
    open: false
  };

  toggleHover = () => {
    this.setState({
      hover: !this.state.hover
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let styleContainer;
    if (this.state.hover) {
      styleContainer = Object.assign({}, styles.container, styles.hover);
    } else {
      styleContainer = styles.container;
    }
    const styleIcon = Object.assign({}, styles.addIcon, { color: styleContainer.color });

    return (
      <div
        className="row middle-xs center-xs"
        style={styleContainer}
        onClick={this.handleOpen}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <ContentAdd style={styleIcon} />
        Pridať novú adresu.
        <AddFormModal
          isOpen={this.state.open}
          handleClose={this.handleClose}
          user={this.props.user}
        />
      </div>
    );
  }
}


export default Relay.createContainer(AddButton, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${AddFormModal.getFragment('user')}
      }
    `
  }
});
