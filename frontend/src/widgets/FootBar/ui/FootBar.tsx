"use client";

import { routes } from "@shared/consts";
import { TabBar } from "antd-mobile";
import classNames from "classnames";
import { FC, useMemo } from "react";
import styles from "./styles.module.scss";
import { useRouter, usePathname } from "next/navigation";

const FootBar: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const tab = useMemo(
    () =>
      pathname === routes.base.url
        ? routes.base.url
        : Object.values(routes).find(
            (x) => pathname.includes(x.url) && x.url !== routes.base.url,
          )?.url,
    [pathname],
  );

  const handleTabClick = (url: string) => {
    router.push(url);
  };

  return (
    <div
      className={classNames(
        styles.footBar,
        "fixed bottom-0 left-0 w-full shadow-top",
      )}
    >
      <TabBar className="flex justify-between w-full bg-white" activeKey={tab}>
        {Object.keys(routes).map((key) => (
          <TabBar.Item
            key={routes[key].url}
            icon={routes[key].icon}
            title={routes[key].title}
            onClick={() => handleTabClick(routes[key].url)}
          />
        ))}
      </TabBar>
    </div>
  );
};

export default FootBar;
