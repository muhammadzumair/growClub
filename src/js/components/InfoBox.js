import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { white } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';
import ThemeDefault from 'js/themes/default';

const textColor = ThemeDefault.palette.textColor;

class InfoBox extends Component {
  static propTypes = {
    Icon: PropTypes.any,
    color: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string
  };

  render() {
    const { color, title, value, Icon } = this.props;

    const styles = {
      content: {
        padding: '5px 10px',
        marginLeft: 90,
        height: 80
      },
      number: {
        display: 'block',
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: textColor
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        color: textColor
      },
      iconSpan: {
        float: 'left',
        height: 90,
        width: 90,
        textAlign: 'center',
        backgroundColor: color
      },
      icon: {
        height: 48,
        width: 48,
        marginTop: 20,
        maxWidth: '100%'

      }
    };

    return (
      <Paper>
        <span style={styles.iconSpan}>
          <Icon color={white}
                style={styles.icon}
          />
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
    );
  }
}


export default InfoBox;
