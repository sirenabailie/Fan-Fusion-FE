import React from 'react';
import PropTypes from 'prop-types';

function FontAwesomeIcon({ icon, className = '', ...props }) {
  return <i className={`${icon} ${className}`} {...props} />;
}

FontAwesomeIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default FontAwesomeIcon;
