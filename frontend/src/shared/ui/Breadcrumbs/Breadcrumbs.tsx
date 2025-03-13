"use client";

import { Breadcrumb } from "../../models";
import Link from "next/link";
import React, { FC } from "react";

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="mb-4 text-xs flex justify-start align-middle gap-2">
      <nav aria-label="Breadcrumb">
        <ol className="list-none flex">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === items.length - 1 ? (
                <span className="text-gray-700">{item.title}</span> // Последний элемент не является ссылкой
              ) : (
                <Link href={item.url} className="text-blue-600 hover:underline">
                  {item.title}
                </Link>
              )}
              {index < items.length - 1 && (
                <span className="mx-2 text-gray-400"> &gt; </span> // Разделитель
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
