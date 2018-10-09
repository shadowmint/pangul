import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { User } from '../../../common/model/user';
import { UserContext } from '../../../common/contexts/userContext';
import { AdminRolesDbAdmin } from '../../consts/permissions';
import RequiresPermission from '../../../common/elments/auth/requiresPermission';
import './adminHome.scss';

const AdminHome = props => (
  <div className="component--AdminHome">
    <h1>Administration</h1>
    <div className="adminAreas">
      <div className="adminSectionLink">
        <Link to="/admin/styles">Style check</Link>
      </div>

      <div className="adminSectionLink">
        <Link to="/admin/play">Play pen</Link>
      </div>

      <RequiresPermission permissions={[AdminRolesDbAdmin]} userContext={props.userContext}>
        <div className="adminSectionLink">
          <Link to="/admin/db">DB Admin</Link>
        </div>
      </RequiresPermission>
    </div>
  </div>
);

AdminHome.propTypes = {
  userContext: PropTypes.instanceOf(UserContext).isRequired,
};

export default AdminHome;
