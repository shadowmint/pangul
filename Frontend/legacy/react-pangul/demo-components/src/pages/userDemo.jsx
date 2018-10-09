import React from 'react';
import UserIcon from '../../../src/common/elments/user/userIcon';
import UserProfile from '../../../src/common/elments/user/userProfile';

export const UserDemo = () => (
  <React.Fragment>
    <div className="example">
      <div className="example--part">
        <UserIcon
          size="1em"
          username="fake user"
          icon="src/images/icon1.png"
        />
      </div>
      <div className="example--part">
        <UserIcon
          size="2em"
          username="fake user"
          icon="src/images/icon1.png"
        />
      </div>
      <div className="example--part">
        <UserIcon
          size="4em"
          username="fake user"
          icon="src/images/icon1.png"
        />
      </div>
      <div className="example--part">
        <UserIcon size="2em" username="fake user" />
      </div>
    </div>

    <div className="example">
      <UserProfile username="fake user" icon="src/images/icon1.png" />
    </div>
  </React.Fragment>
);
