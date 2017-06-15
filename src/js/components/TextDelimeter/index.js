import React, { PropTypes } from 'react';
import style from './style.scss';

const TextDelimeter = props => (
  <div className={style.wrap}>
    <h4>
      <span>{props.title}</span>
    </h4>
  </div>
);

TextDelimeter.propTypes = {
  title: PropTypes.string
};

export default TextDelimeter;
