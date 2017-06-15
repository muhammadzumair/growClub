import React, { Component } from 'react';
import moment from 'moment';

// icons
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import JoinedIcon from 'material-ui/svg-icons/action/turned-in-not';

// components
import ProfileToolbar from './Toolbar';
import ProfileStat from './Stat';


class ProfileHeader extends Component {
  render() {
    const styles = {
      container: {
        height: 200,
        paddingTop: 15,
      }
    };

    const { profileTitle, profileSubtitle } = this.props;

    return (
      <div style={styles.container}>
        <div className="col-sm-12">
          <ProfileToolbar
            title={profileTitle}
            subtitle={profileSubtitle}
          />
        </div>
        <div className="col-md-12">
          <ProfileStat
            icon={<MoneyIcon />}
            title="Credits"
            value="200 CR"
          />
          <ProfileStat
            icon={<SchoolIcon />}
            title="Courses"
            value="126"
          />
          <ProfileStat
            icon={<JoinedIcon />}
            title="Joined"
            value={moment(new Date()).format('LLL')}
          />
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
