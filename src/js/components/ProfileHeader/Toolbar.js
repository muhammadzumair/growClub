import React, { PropTypes } from 'react';
import {
  RaisedButton,
  IconButton,
  IconMenu,
  MenuItem
} from 'material-ui';

// icons
import EditorIcon from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// Avatar
import Avatar from 'material-ui/Avatar';
import profilePhoto from 'assets/images/profile-avatar.png';


const DropdownMenu = () => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Option 1" />
    <MenuItem primaryText="Option 2" />
    <MenuItem primaryText="Option 3" />
  </IconMenu>
);

const ProfileToolbar = (props) => {
  const styles = {
    user: {
      wrapper: {
        display: 'flex',
        alignItems: 'center'
      },
      avatar: {
        marginTop: 10,
        marginLeft: 30,
        display: 'inline-block'
      },
      title: {
        fontSize: 30,
        fontWeight: '500',
        margin: 0,
        padding: 2
      },
      textDiv: {
        marginLeft: 22,
        display: 'inline-block'
      },
      subtitle: {
        fontSize: 13,
        margin: 0,
        padding: 2
      },
    },
    options: {
      wrapper: {
        display: 'flex',
        margin: 10,
        marginLeft: 'auto',
        alignItems: 'center'
      },
      messageBtn: {
        marginRight: 20
      },
    }
  };

  const avatar = props.avatar || profilePhoto;

  return (
    <div className="row between-sm">
      <div style={styles.user.wrapper}>
        <Avatar
          src={avatar}
          size={100}
          style={styles.user.avatar}
        />
        <div style={styles.user.textDiv}>
          <p style={styles.user.title}>{props.title}</p>
          <p style={styles.user.subtitle}>{props.subtitle}</p>
        </div>
      </div>

      <div style={styles.options.wrapper}>
        <RaisedButton
          primary={true}
          label="Send message"
          style={styles.options.messageBtn}
        />

        <IconButton
          tooltip="Edit"
          touch={true}
          tooltipPosition="bottom-left"
        >
          <EditorIcon />
        </IconButton>

        <DropdownMenu />
      </div>
    </div>
  );
};

ProfileToolbar.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};


export default ProfileToolbar;
