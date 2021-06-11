import { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { Button } from "antd";
import { LayoutOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import {
  gridLayoutState,
  widgetDefsState,
  widgetDataState,
  WidgetDefinition,
} from "../../store/atoms";
import "./Dashboard.less";
import { widgets } from "../../mock/widgets";
import WidgetShell from "../../widgets/WidgetShell/WidgetShell";
import { DeleteWidgetModal, EditWidgetModal } from "../../widgets";

//Page contains all the widgets created

const ReactGridLayout = WidthProvider(RGL);

function Dashboard() {
  const [widgetDefs, setWidgetDefs] = useRecoilState(widgetDefsState);
  const [gridLayout, setGridLayout] = useRecoilState(gridLayoutState);
  const [ , setWidgetData] = useRecoilState(widgetDataState);

  function onResizeStop(e: any) {
    console.log(e);
  }

  useEffect(() => {
    setWidgetDefs(widgets  as WidgetDefinition []);
    // getWidgetsData().then((data) => {
    //   console.log(data);
    //   setWidgetDefs(data);
    // });

    // getData().then((data) => {
    //   console.log(data);
    //   setWidgetData(data);
    // });
  }, [setWidgetData, setWidgetDefs]);

  const gridProps = {
    isDraggable: true,
    isResizable: true,
    items: 20,
    rowHeight: 10,
    cols: 100,
    onResizeStop: onResizeStop,
    onLayoutChange: function () {},
  };

  const onSaveLayout = () => {
    let hMap : Record<string ,WidgetDefinition> = {};

    // gridLayout.forEach((item) => {
    //   hMap[item.i] = item;
    // });

    const newDefs = widgetDefs.map((widgetDef) => {
      let newDef = { ...widgetDef, ...hMap[widgetDef.id] };
    //   delete newDef.i;
      return newDef;
    });
    // newDefs.forEach((def) =>
    //   putWidgetData(def).then((data) => {
    //     console.log(data);
    //   })
    // );
  };

  const onLayoutChange = (layout: any) => {
    setGridLayout(layout);

    gridProps.onLayoutChange(); // updates status display
  };

  return (
    <>
      <EditWidgetModal></EditWidgetModal>
      <DeleteWidgetModal></DeleteWidgetModal>
      <Button
        className="layout-save-btn"
        type="primary"
        shape="circle"
        icon={<LayoutOutlined />}
        size={"large"}
        onClick={onSaveLayout}
      ></Button>
      <ReactGridLayout
        {...gridProps}
        layout={gridLayout}
        onLayoutChange={onLayoutChange}
      >
        {widgetDefs.map((widgetDef: WidgetDefinition) => (
          <div key={widgetDef.id} data-grid={widgetDef}>
            <WidgetShell key={widgetDef.id} widgetDef={widgetDef}></WidgetShell>
          </div>
        ))}
      </ReactGridLayout>
    </>
  );
}

export default Dashboard;
