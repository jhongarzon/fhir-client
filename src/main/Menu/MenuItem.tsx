import React, { FC } from "react";
import { MenuItemConfig } from "./types";

const MenuItem: FC<MenuItemConfig> = (item: MenuItemConfig) => {
  return (
    <div className="dx-item dx-list-item" role="option">
      <div className="dx-list-item-icon-container">
        <i className={`dx-icon dx-icon-${item.icon} dx-list-item-icon`}></i>
      </div>
      <a href={item.route} style={{ color: "#fff", textDecoration: "none" }}>
        {item.text}
      </a>
    </div>
  );
};

export default MenuItem;
