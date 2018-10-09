import React from 'react';
import PropTypes from 'prop-types';
import {User} from '../../../common/model/user';
import {UserContext} from '../../../common/contexts/userContext';
import UserProfile from '../../../common/elments/user/userProfile';
import Logout from '../../../common/elments/auth/logout';
import './profileHome.scss';
import PangulContext from '../../pangulContext';

const ProfileHome = props => (
    <div className="component--ProfileHome">
      <PangulContext.Consumer>
        {(context) => (
            <div className="userinfo">
              <UserProfile username={context.userContext.user.name}/>
              <div>
                <Logout userContext={context.userContext}>
                  Logout
                </Logout>
              </div>
            </div>
        )}
      </PangulContext.Consumer>
    </div>
);

ProfileHome.propTypes = {
  userContext: PropTypes.instanceOf(UserContext).isRequired,
  user: PropTypes.instanceOf(User).isRequired,
};

export default ProfileHome;