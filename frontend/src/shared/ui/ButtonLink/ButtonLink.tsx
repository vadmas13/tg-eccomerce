import classNames from "classnames";
import Link from "next/link";
import { FC, ReactNode } from "react";

type ButtonLinkProps = {
  link: string;
  text: string;
  icon?: ReactNode;
  color: "blueDark" | "blueWhite";
};

const ButtonLink: FC<ButtonLinkProps> = ({ link, icon, text, color }) => {
  return (
    <Link
      href={link}
      className={classNames(
        "flex items-center gap-2 !w-full justify-center rounded p-[3px]",
        {
          ["bg-blue-500 text-white"]: color === "blueDark",
          ["bg-blue-100 !text-blue-500 active:bg-gray-100"]:
            color === "blueWhite",
        },
      )}
    >
      <div className="text-[20px]">{icon}</div>
      <span className="text-[14px]">{text}</span>
    </Link>
  );
};

export default ButtonLink;
