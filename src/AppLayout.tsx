import { useState } from "react";
import { Layout, Menu } from "antd";
import "./AppLayout.less";
// import { Dashboard } from "./pages";

//Code is for the layout with three tabs.

const { Header, Content } = Layout;

function getPage(nav: string) {
    // return <Dashboard />;
    return `test ${nav}`;
}

function AppLayout() {
  const [nav, setNav] = useState("1");

  return (
    <Layout className="ars-layout">
      <Header>
        <div className="ars-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={(e) => setNav(e.key)}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1">Dashboard</Menu.Item>
        </Menu>
      </Header>
      <Content className="ars-layout-content">{getPage(nav)}</Content>
    </Layout>
  );
}

export default AppLayout;