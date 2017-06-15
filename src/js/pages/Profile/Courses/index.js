import React, { Component } from 'react';
import CourseCard from 'js/components/Courses/Card';
import CoursesDrawer from 'js/components/Courses/Drawer';
import Timeline from './Timline';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDrawer: false
    };
  }

  handleToggleDrawer = () => {
    this.setState({
      toggleDrawer: !this.state.toggleDrawer
    });
  };

  render() {
    const styles = {
      mainContainer: {
        marginTop: 30
      }
    };

    const courses = [];
    for (let index = 0; index < 5; index += 1) {
      courses.push(
        <CourseCard
          key={index}
          trainer="John Doe"
          courseName="Training name"
          courseDescription="Short course description goes here. Duis eros odio, dictum id porta a, blandit sit amet ex. Cras nunc nisi, egestas et lacus sed, scelerisque luctus leo."
          imageSource="https://tctechcrunch2011.files.wordpress.com/2015/04/codecode.jpg?w=738"
          onCourseClick={this.handleToggleDrawer}
        />
      );
    }

    return (
      <div className="row" style={styles.mainContainer}>
        <CoursesDrawer
          open={this.state.toggleDrawer}
          toggle={this.handleToggleDrawer}
          course={{ title: 'Course title' }}
        />
        <div className="col-xs-3">
          <h3>Upcoming Courses</h3>
          <Timeline />
        </div>
        <div className="col-xs-9">
          <h3>Last visited Courses</h3>
          <div className="row">
            {courses}
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
