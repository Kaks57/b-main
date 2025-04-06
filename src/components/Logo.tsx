import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="/logo.png"
        alt="Atelier Unique Logo"
        className="w-40 h-20 rounded-full mr-2 object-cover"
      />
    </Link>
  );
};

export default Logo;
