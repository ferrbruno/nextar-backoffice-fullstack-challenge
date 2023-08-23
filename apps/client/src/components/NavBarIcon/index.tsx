import { MouseEventHandler, ReactNode } from "react";

interface NavBarIconProps {
  icon: ReactNode;
  text?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function NavBarIcon({
  icon,
  text = "tooltip",
  onClick,
}: NavBarIconProps) {
  return (
    <div className="navbar-icon group" onClick={onClick}>
      {icon}
      <span className="navbar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}
