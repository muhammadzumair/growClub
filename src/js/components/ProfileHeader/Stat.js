import React, { PropTypes } from 'react';


const ProfileStat = (props) => {
  const styles = {
    container: {
      marginTop: 25,
      marginLeft: 130,
      display: 'inline-block'
    },
    box: {
      display: 'inline-block',
      marginLeft: 10,
    },
    title: {
      fontSize: 14,
      textTransform: 'uppercase',
      margin: 0,
      padding: 0
    },
    value: {
      fontSize: 16,
      margin: 0,
      padding: 0,
      fontWeight: '600'
    },
  };

  return (
    <div style={styles.container}>
      {props.icon}
      <div style={styles.box}>
        <p style={styles.title}>
          {props.title}
        </p>
        <p style={styles.value}>
          {props.value}
        </p>
      </div>
    </div>
  );
};

ProfileStat.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};


export default ProfileStat;
