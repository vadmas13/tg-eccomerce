"use client";

import { Popup } from "antd-mobile";
import React, { FC, PropsWithChildren } from "react";

type NavbarSearchPopupProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  height?: string;
} & PropsWithChildren;

const PopupComponent: FC<NavbarSearchPopupProps> = ({
  visible,
  setVisible,
  children,
  height,
}) => {
  return (
    <Popup
      visible={visible}
      onMaskClick={() => setVisible(false)}
      onClose={() => setVisible(false)}
      showCloseButton
      bodyStyle={{ height: height ?? "40vh" }}
      position="top"
    >
      <div className="p-5 overflow-y-scroll" style={{ height }}>
        {children}
      </div>
    </Popup>
  );
};

export default PopupComponent;
