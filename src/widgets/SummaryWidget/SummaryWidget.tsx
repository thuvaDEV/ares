import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { widgetDataState, WidgetDefinition, widgetDefsState } from "../../store/atoms";
import { Select } from "antd";
import { replaceItemAtIndex } from "../../shared/util";
// import { v4 as uuidv4 } from "uuid";
import { putWidgetData } from "../../data-com/api";
import "./SummaryWidget.less";

const { Option } = Select;

  export default function SummaryWidget({widgetDef}: { widgetDef:WidgetDefinition}) {
  const [year, setYear] = useState(widgetDef.data.year);
  const widgetData = useRecoilValue(widgetDataState);
  const [widgetDefs, setWidgetDefs] = useRecoilState(widgetDefsState);

  function handleChange(value: any) {
    setYear(value);
    let newWidgetDef = { ...widgetDef, data: { year: value}}
    const index = widgetDefs.findIndex((e) => e.id === widgetDef.id);
    const newList = replaceItemAtIndex(widgetDefs, index, newWidgetDef);
    setWidgetDefs(newList);
    putWidgetData(newWidgetDef);
    console.log(`selected ${value}`);
  }

//   const options = widgetData? Object.keys(widgetData).map((year) => <Option key={year}>{year}</Option>): '';

//   const content = widgetData && year && widgetData[year]?  Object.keys(widgetData[year]).map(prop => (
//     <div className="info-snip" key={uuidv4()}>
//     <p className="info-heading">{prop}</p>
//     <p className="info-content">{widgetData[year][prop]}</p>
//     </div>
//   )): '';

  return (
    <div className="widget-content">
      <Select className="date-select"
        defaultValue={widgetDef.data.year}
        style={{ width: 80 }}
        size="small"
        onChange={handleChange}>
        {/* {options} */}
      </Select>
      {/* {content} */}
    </div>
  );
}
