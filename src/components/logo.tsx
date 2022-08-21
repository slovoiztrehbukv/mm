import React from "react";

type LogoContainerProps = {
  name: string
}

export const LogoContainer: React.FC<LogoContainerProps> = props => {
  return (
    <div className="m-auto text-center">
      {props.name}
    </div>
  )
}