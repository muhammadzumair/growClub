import React, { Component, PropTypes } from 'react';
import { navigate } from 'react-big-calendar/lib/utils/constants';

import Button from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';
import IconRight from 'material-ui/svg-icons/navigation/chevron-right';

class Toolbar extends Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  };

  render() {
    const { label } = this.props;

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <Button onClick={this.navigate.bind(null, navigate.TODAY)}>
            Dnes
          </Button>
        </span>
        <span className='rbc-btn-group'>

          <IconButton
            tooltip="Predchádzajúce obdobie"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            <IconLeft />
          </IconButton>

          <IconButton
            tooltip="Následujúce obdobie"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            <IconRight />
          </IconButton>
        </span>

        <span className='rbc-toolbar-label'>
          {label}
        </span>

        <span className='rbc-btn-group'>
          {this.viewNamesGroup()}
        </span>
      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action);
  }

  view = (view) => {
    this.props.onViewChange(view);
  }

  viewNamesGroup() {
    const viewNames = this.props.views;
    const view = this.props.view;
    let result = null;

    const viewLabels = {
      day: 'Deň',
      week: 'Týždeň',
      month: 'Mesiac',
      agenda: 'Agenda',
    };


    if (viewNames.length > 1) {
      result = (
        viewNames.map(name =>
          <FlatButton key={name}
                  primary={view === name}
                  onClick={this.view.bind(null, name)}
          >
            {viewLabels[name]}
          </FlatButton>
        )
      );
    }

    return result;
  }
}

export default Toolbar;
