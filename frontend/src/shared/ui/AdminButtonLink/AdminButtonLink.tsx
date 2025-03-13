import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

const AdminButtonLink: FC<ButtonLinkProps> = ({ href, children, icon }) => {
  return (
    <Link
      href={href}
      className="inline-block p-1 px-4 bg-white border text-[14px]
       text-gray-800 rounded active:bg-gray-100 transition"
    >
      {icon ? (
        <div className="flex gap-2 items-center">
          {icon}
          {children}
        </div>
      ) : (
        children
      )}
    </Link>
  );
};

export default AdminButtonLink;
