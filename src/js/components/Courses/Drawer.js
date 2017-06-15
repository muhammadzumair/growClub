import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import ThemeDefault from 'js/themes/default';
import {
  AppBar,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardText,
  Drawer,
  IconMenu,
  IconButton,
  MenuItem
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import profilePhoto from 'assets/images/profile-avatar.png';


const CourseTable = (props) => {
  const {
    price,
    date,
    signed,
    capacity
  } = props;

  return (
    <Table>
      <TableBody
        displayRowCheckbox={false}
        selectable={false}
      >
        <TableRow>
          <TableRowColumn><b>Price</b></TableRowColumn>
          <TableRowColumn>{price}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn><b>Date</b></TableRowColumn>
          <TableRowColumn>{moment(date).format('LL')}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn><b>Time</b></TableRowColumn>
          <TableRowColumn>{moment(date).format('hh:mm')}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn><b>Capacity</b></TableRowColumn>
          <TableRowColumn>{signed} / {capacity}</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  );
};

class CoursesDrawer extends Component {

  static propTypes = {
    open: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    course: PropTypes.object,
  };

  render() {
    const course = this.props.course || {
      id: null,
      title: null,
      start: new Date(),
      desc: null,
      color: null
    };

    const styles = {
      appBar: {
        backgroundColor: course.color ? `#${course.color}` : ThemeDefault.palette.primary1Color
      },
      headingStyles: {
        paddingBottom: 10,
        paddingRight: 80,
        fontWeight: '600'
      },
      avatarStyles: {
        marginRight: 5
      }
    };


    return (
      <Drawer
        docked={false}
        width={400}
        open={this.props.open}
        openSecondary={true}
        onRequestChange={open => this.props.toggle(open)}
      >
        <Card zDepth={0}>
          <AppBar
            title={course.title}
            showMenuIconButton={false}
            style={styles.appBar}
            iconElementRight={
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="Option 1" />
                <MenuItem primaryText="Option 2" />
                <MenuItem primaryText="Option 3" />
              </IconMenu>
            }
          />
          <CardMedia>
            <img src="https://tctechcrunch2011.files.wordpress.com/2015/04/codecode.jpg?w=738" alt="" />
          </CardMedia>

          <CardHeader avatar={profilePhoto} title="John Smith" subtitle="trainer" />
          <CardText>
            {course.desc}<br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet
            tincidunt elit, a mollis nisi. Sed sed lacus a lorem mattis tristique
            ut vitae nulla. Donec nulla massa, cursus non purus et, gravida interdum ligula.
            Duis eros odio, dictum id porta a, blandit sit amet ex. Cras nunc nisi,
            egestas et lacus sed, scelerisque luctus leo. Nulla at leo at risus
            sagittis tempor eu ut libero. Maecenas tempus posuere tellus ut iaculis.
            Donec eleifend imperdiet augue nec consequat.
          </CardText>

          <CardText>
            <CourseTable
              price="60 CR"
              date={course.start}
              capacity="10"
              signed="7"
            />
          </CardText>

          <CardHeader title="Attendants" />
          <CardText>
            <Avatar style={styles.avatarStyles} src={profilePhoto} />
            <Avatar style={styles.avatarStyles} src={profilePhoto} />
            <Avatar style={styles.avatarStyles} src={profilePhoto} />
          </CardText>
        </Card>
      </Drawer >
    );
  }
}

export default CoursesDrawer;
