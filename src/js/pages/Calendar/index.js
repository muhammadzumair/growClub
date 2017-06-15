import React, { Component } from 'react';
import { typography } from 'material-ui/styles';
import { grey600 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import CoursesDrawer from 'js/components/Courses/Drawer';

import Calendar from 'js/components/Calendar';
import events from 'js/components/Calendar/events';

const fetchOne = eventID => events.find(({ id }) => eventID === id);

const styles = {
  navigation: {
    fontSize: 17,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block'
  },
  paper: {
    padding: 30,
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20
  }
};


class Page extends Component {
  state = {
    modal: {
      open: false,
      eventID: null
    }
  };

  handleOpen = (eventID) => {
    this.setState({
      modal: {
        open: true,
        eventID
      }
    });
  };

  handleClose = (open) => {
    this.setState({
      modal: {
        open,
        eventID: null
      }
    });
  };

  render() {
    return (
      <div>
        <h3 style={styles.navigation}>Kalendár</h3>
        <div className="row">
          <div className="col-lg-12">
            <Paper style={styles.paper}>
              <Calendar
                onSelectEvent={event => this.handleOpen(event.id)}
              />
            </Paper>
          </div>
        </div>
        <CoursesDrawer
          open={this.state.modal.open}
          toggle={this.handleClose}
          course={fetchOne(this.state.modal.eventID)}
        />
      </div>
    );
  }
}


export default Page;
