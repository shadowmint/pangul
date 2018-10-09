import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../../common/contexts/userContext';
import { AdminRolesDbAdmin } from '../../consts/permissions';
import RequiresPermission from '../../../common/elments/auth/requiresPermission';
import StatusReport from '../../elements/statusReport/statusReport';
import PangulDbService from "../../services/pangulDbService";

function getMigrationStatus(api) {
  const dbService = new PangulDbService(api);
  return dbService.getMigrationStatus();
}

const AdminDB = props => (
  <div className="component--AdminDb">
    <RequiresPermission permissions={[AdminRolesDbAdmin]} userContext={props.userContext}>
      <h1>Database Administration</h1>
      <div className="pageBlock adminBlock">
        <h4>Database migration status</h4>
        <StatusReport task={() => getMigrationStatus(props.userContext.api)} />
      </div>
    </RequiresPermission>
  </div>
);

AdminDB.propTypes = {
  userContext: PropTypes.instanceOf(UserContext).isRequired,
};

export default AdminDB;
