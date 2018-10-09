import React from 'react';
import {Link} from 'react-router-dom';

const AdminPlayNav = () => (
    <div className="adminAreas">
      <div className="adminSectionLink">
        <Link to="/admin/play">Experiments</Link>
      </div>
      <div className="adminSectionLink">
        <Link to="/admin/play/template">Template</Link>
      </div>
    </div>
);

export default AdminPlayNav;
