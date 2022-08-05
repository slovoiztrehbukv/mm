import React from "react";
import { useNavigate } from "react-router";
import { ReactComponent as Logo } from '../images/logo.svg';

export const LogoContainer: React.FC = () => {
  const nav = useNavigate()

  return (
      <>
        <div className="logo_container">
          <Logo />
        </div>
      </>
  )
}