import React from "react";
import { Link } from "react-router-dom";

type LogoContainerProps = {
  name: string
}

export const LogoContainer: React.FC<LogoContainerProps> = props => {

  return (
    <div className="m-auto text-center">
      <Link to="/">{props.name}</Link>
    </div>
  )
}