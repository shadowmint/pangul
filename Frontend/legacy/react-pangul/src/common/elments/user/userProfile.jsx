import React from 'react';
import PropTypes from 'prop-types';
import './userProfile.scss';
import UserIcon from './userIcon';

export default function UserProfile(props) {
  return (
    <div className="component--UserProfile">
      <UserIcon username={props.username} size="3em" icon={props.icon} />
      <div className="user">
        {props.username}
        <div className="rep">100</div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  // The public username of the user
  username: PropTypes.string.isRequired,

  // The icon to display for the user
  icon: PropTypes.string,
};

UserProfile.defaultProps = {
  icon: null,
};
