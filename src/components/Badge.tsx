import type { ReactNode } from "react";

interface BadgeProps {
  text: ReactNode;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <span className="uppercase w-fit text-white text-sm font-black bg-gradient-to-tr from-primary-gradient-dark to-primary-gradient-light px-2 py-1 rounded-lg">
      {text}
    </span>
  );
};

export default Badge;
