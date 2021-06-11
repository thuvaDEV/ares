import { useRecoilState } from "recoil";
import { EllipsisOutlined } from "@ant-design/icons";
import { Menu, Dropdown, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  CameraOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./WidgetShell.less";
import {
  widgetDefsState,
  editModalVisibleState,
  widgetDefState,
  deleteModalVisibleState,
  WidgetDefinition,
} from "../../store/atoms";
import SummaryWidget from "../SummaryWidget/SummaryWidget";
import ChartWidget from "../ChartWidget/ChartWidget";
// import cloneDeep from "lodash/cloneDeep";
// import { v4 as uuidv4 } from "uuid";
// import { postWidgetData } from "../../data-com/api";

const handleButtonClick = (e: any) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};

export default function WidgetShell({widgetDef}: { widgetDef:WidgetDefinition}) {
  const [, setEditModalVisible] = useRecoilState(editModalVisibleState);
  const [, setDeleteModalVisible] = useRecoilState(deleteModalVisibleState);
  const [widgetDefs, setWidgetDefs] = useRecoilState(widgetDefsState);
  const [, setWidgetDef] = useRecoilState(widgetDefState);

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case "edit":
        // setWidgetDef(cloneDeep(widgetDef));
        setEditModalVisible(true);
        break;
      case "delete":
        // setWidgetDef(cloneDeep(widgetDef));
        setDeleteModalVisible(true);
        break;
      case "clone":
        // let clonedWidgetDef = cloneDeep(widgetDef);
        // clonedWidgetDef.id = uuidv4();
        // setWidgetDefs([...widgetDefs, clonedWidgetDef]);
        // postWidgetData(clonedWidgetDef).then((data) => {
        //   console.log(data);
        // });
        break;

      default:
        console.log("default");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
      <Menu.Item key="clone" icon={<CopyOutlined />}>
        Clone
      </Menu.Item>
      <Menu.Item key="snapshot" icon={<CameraOutlined />}>
        Snapshot
      </Menu.Item>
    </Menu>
  );

  function getWidget(type:any) {
    switch (type) {
      case "SUMMARY":
        return <SummaryWidget widgetDef={widgetDef}></SummaryWidget>;
      case "CHART":
        return <ChartWidget widgetDef={widgetDef}></ChartWidget>;
      case "NOTES":
        return <SummaryWidget widgetDef={widgetDef}></SummaryWidget>;
      default:
        return '';
    }
  }

  return (
    <div className="widget-shell">
      <div className="header">
        <div className="top-left">
          <h3>{widgetDef.title}</h3>
        </div>
        <div className="top-right">
       <Dropdown.Button
            icon={<EllipsisOutlined />}
            size="small"
            type="primary"
            onClick={handleButtonClick}
            overlay={menu}
          /> 
        </div>
        <div className="bottom-left"></div>
      </div>
       {getWidget(widgetDef.type)}
      TEST
    </div>
  );
}
