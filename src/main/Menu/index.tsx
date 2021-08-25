import React, { FC } from "react";
import List from "devextreme-react/list.js";
import MenuItem from "./MenuItem";
import { MenuItemConfig } from "./types";

const Menu: FC = () => {
  const navigation: MenuItemConfig[] = [
    { id: 1, text: "Patients", icon: "product", route: "/patients" },
    { id: 2, text: "Practitioneers", icon: "money", route: "/practitioners" },
    { id: 3, text: "Scheduler", icon: "group", route: "/scheduler" },
    { id: 4, text: "Advanced Scheduler", icon: "chart", route: "/advanced" }, 
    { id: 5, text: "Reports", icon: "chart", route: "/charts" },
    
  ];

  return (
    <div className="list" style={{ width: "200px" }}>
      <List
        dataSource={navigation}
        itemRender={MenuItem}
        elementAttr={{
          class: "panel-list dx-theme-accent-as-background-color",
        }}
      />
    </div>
  );
};

export default Menu;
