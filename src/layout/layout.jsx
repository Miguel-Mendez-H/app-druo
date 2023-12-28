import React, { Children } from 'react';
import { Link } from 'react-router-dom';

const LayoutPrincipal = (props) => {
  return (
    <div className="layoutPrincipal">
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/create-business">Create Business</Link>
          </li>
          <li>
            <Link to="/list-business">List Business</Link>
          </li>
        </ul>
      </div>
      <div className="layoutPrincipal__content">
        {props.children}
      </div>
    </div>
  );
};

export default LayoutPrincipal;