import React from "react";
import styles from "./tooltip.module.css";
const Tooltip = ({ children, textTitle }) => {


  return (
    <div className={`btn-group dropend`}>
      <b 
        style={{cursor:'pointer'}}
        className={`${styles.tooltip} dropdown-toggle text-decoration-underline fw-bold`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {textTitle}
      
      </b>
      
      <ul className="dropdown-menu p-3">
        {children}
      </ul>
    </div>
  );
};

export default Tooltip;
