import React, { PropTypes } from 'react';
import Item from './Item';
import AddButton from './AddButton';

const styles = {
  addressItem: {
    margin: '10px 0 0 10px',
    flexGrow: 1
  }
};


const List = (props) => {
  const itemStyle = styles.addressItem;
  itemStyle.flexBasis = `calc(100% * (1/${props.columns}) - 10px - 1px)`;
  return (
    <div className="row">
      {React.Children.map(props.children, (child) => {
        let draw = null;
        if (child.type === AddButton) {
          draw = child;
        } else {
          draw = (
            <div style={itemStyle}>
              {child}
            </div>
          );
        }
        return draw;
      })}
    </div>
  );
};

List.propTypes = {
  columns: PropTypes.number.isRequired,
  children: PropTypes.array
};

export default {
  List,
  Item,
  AddButton
};
