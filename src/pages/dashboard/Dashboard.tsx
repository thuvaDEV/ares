import { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { Button } from "antd";
import { LayoutOutlined, GithubOutlined } from "@ant-design/icons";
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
import { gdpData } from "../../mock/gdp-data";
import { getWidgetsData, getWidgetsDefs, isMock, putWidgetDef } from "../../data-com/api";

const ReactGridLayout = WidthProvider(RGL);

function Dashboard() {
  const [widgetDefs, setWidgetDefs] = useRecoilState(widgetDefsState);
  const [gridLayout, setGridLayout] = useRecoilState(gridLayoutState);
  const [, setWidgetData] = useRecoilState(widgetDataState);

  function onResizeStop(data: any) {
    // console.log(data);
  }

  useEffect(() => {
    isMock() ? setWidgetDefs(widgets as WidgetDefinition[]) :
      getWidgetsDefs().then((data) => {
        setWidgetDefs(data);
      });

    isMock() ? setWidgetData(gdpData as any) :
      getWidgetsData().then((data) => {
        setWidgetData(data);
      });
  }, [setWidgetData, setWidgetDefs]);

  const gridProps = {
    isDraggable: true,
    isResizable: true,
    items: 20,
    rowHeight: 10,
    cols: 100,
    onResizeStop: onResizeStop,
    onLayoutChange: function () { },
  };

  const onSaveLayout = () => {
    let hMap: Record<string, WidgetDefinition> = {};

    // gridLayout.forEach((item) => {
    //   hMap[item.i] = item;
    // });

    const newDefs = widgetDefs.map((widgetDef) => {
      let newDef = { ...widgetDef, ...hMap[widgetDef.id] };
      // delete newDef.i;
      return newDef;
    });

    newDefs.forEach((def) => {
      if (!isMock()) {
        putWidgetDef(def).then((data) => {
          // console.log(data);
        })
      }
    }
    );
  };

  const onLayoutChange = (layout: any) => {
    setGridLayout(layout);

    gridProps.onLayoutChange(); // updates status display
  };

  return (
    <div className="dashboard">
      <EditWidgetModal></EditWidgetModal>
      <DeleteWidgetModal></DeleteWidgetModal>
      <div className="btns">
        <Button
          className="github-btn"
          type="link"
          shape="circle"
          icon={<GithubOutlined />}
          size={"large"}
          href="https://github.com/thuvaDEV/ares"
        ></Button>
        <Button
          className="layout-save-btn"
          type="primary"
          shape="circle"
          disabled={isMock()}
          icon={<LayoutOutlined />}
          size={"large"}
          onClick={onSaveLayout}
        ></Button>
      </div>
      <ReactGridLayout
        {...gridProps}
        layout={gridLayout}
        onLayoutChange={onLayoutChange}
      >
        {(widgetDefs).map((widgetDef: WidgetDefinition) => (
          <div key={widgetDef.id} data-grid={widgetDef}>
            <WidgetShell key={widgetDef.id} widgetDef={widgetDef}></WidgetShell>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}

export default Dashboard;
