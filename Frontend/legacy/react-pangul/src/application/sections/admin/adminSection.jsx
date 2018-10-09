import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import AdminHome from './adminHome';
import AdminStyles from './adminStyles';
import AdminDb from './adminDb';
import RequiresPermission from '../../../common/elments/auth/requiresPermission';
import {AdminRolesDbAdmin, AdminRolesView} from '../../consts/permissions';
import PangulContext from '../../pangulContext';
import AdminPlaySection from './playpen/adminPlaySection';

const RenderAdminHomePage = (c, props) => <AdminHome userContext={c.userContext} {...props}/>;
const RenderAdminDbPage = (c, props) => <AdminDb userContext={c.userContext} {...props} />;

const AdminSection = props => (
    <PangulContext.Consumer>
      {(context) => (
          <RequiresPermission permissions={[AdminRolesView]} userContext={context.userContext}>
            <React.Fragment>

              {/* Admin common area */}
              <Route exact path={`${props.match.url}/`} render={() => RenderAdminHomePage(context, props)}/>
              <Route exact path={`${props.match.url}/styles`} component={AdminStyles}/>
              <Route path={`${props.match.url}/play`} component={AdminPlaySection}/>

              {/* DB related stuff */}
              <RequiresPermission permissions={[AdminRolesDbAdmin]} userContext={context.userContext}>
                <Route exact path={`${props.match.url}/db/`} render={() => RenderAdminDbPage(context, props)}/>
              </RequiresPermission>

            </React.Fragment>
          </RequiresPermission>
      )}
    </PangulContext.Consumer>
);

AdminSection.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminSection;
