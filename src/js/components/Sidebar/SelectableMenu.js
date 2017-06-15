import React, { Component, PropTypes } from 'react';
import { List, makeSelectable } from 'material-ui/List';

const Selectable = makeSelectable(List);

class SelectableList extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleChangeList = (event, value) => {
    this.context.router.push(value);
  };

  render() {
    return (
      <Selectable
        value={location.hash.substring(1)}
        onChange={this.handleChangeList}
      >
        {this.props.children}
      </Selectable>
    );
  }
}

export default SelectableList;
