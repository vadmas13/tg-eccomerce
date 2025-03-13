"use client";

import { DotLoading } from "antd-mobile";
import classNames from "classnames";
import { FC } from "react";

type LoaderProps = {
  cls?: string;
};

const Loader: FC<LoaderProps> = ({ cls }) => {
  return (
    <div className={classNames("flex justify-center align-middle", cls)}>
      <DotLoading color="primary" />
    </div>
  );
};

export default Loader;
