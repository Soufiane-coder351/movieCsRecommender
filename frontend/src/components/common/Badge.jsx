import React from "react";

const Badge = ({ children, className = "" }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
    {children}
  </span>
);

export default Badge;