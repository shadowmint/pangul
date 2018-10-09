import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserIcon from '../../../common/elments/user/userIcon';
import { User } from '../../../common/model/user';
import PangulNav from './pangulNav';
import { UserContext } from '../../../common/contexts/userContext';
import './pangulHeader.scss';

const PangulHeader = props => (
  <div className="component--PangulHeader">
    <PangulNav userContext={props.userContext} />
    <div className="filler" />
    <div className="corner">
      <Link to="/profile/">
        <UserIcon size="32px" username={(props.user || { name: '' }).name} />
      </Link>
    </div>
  </div>
);

export default PangulHeader;
