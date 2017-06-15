import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import theme from 'js/themes/default';

const textColor = theme.appBar.textColor;


const SearchBox = () => {
  const styles = {
    iconButton: {
      float: 'right',
      marginTop: 20
    },
    textField: {
      color: textColor,
      backgroundColor: theme.palette.primary2Color,
      borderRadius: 2,
      paddingLeft: 15,
      height: 45
    },
    inputStyle: {
      color: textColor,
      paddingLeft: 5
    },
    hintStyle: {
      height: 22,
      paddingLeft: 5,
      color: textColor,
    }
  };

  return (
    <div>
      <IconButton style={styles.iconButton} >
        <Search color={textColor} />
      </IconButton>
      <TextField
        hintText="Search..."
        underlineShow={false}
        fullWidth={true}
        color={textColor}
        style={styles.textField}
        inputStyle={styles.inputStyle}
        hintStyle={styles.hintStyle}
      />
    </div>
  );
};


export default SearchBox;
