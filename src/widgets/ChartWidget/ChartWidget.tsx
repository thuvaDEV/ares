import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { widgetDataState, WidgetDefinition, widgetDefsState } from "../../store/atoms";
import { Select } from "antd";
import { replaceItemAtIndex } from "../../shared/util";
import { putWidgetDef } from "../../data-com/api";
import "./ChartWidget.less";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const { Option } = Select;

export default function ChartWidget({ widgetDef }: { widgetDef: WidgetDefinition }) {
  const [field, setField] = useState(widgetDef.data.field);
  const widgetData: Record<string, any> = useRecoilValue(widgetDataState);
  const [widgetDefs, setWidgetDefs] = useRecoilState(widgetDefsState);

  function handleChange(value: any) {
    setField(value);
    let newWidgetDef = { ...widgetDef, data: { field: value }, title: value }
    const index = widgetDefs.findIndex((e) => e.id === widgetDef.id);
    const newList = replaceItemAtIndex(widgetDefs, index, newWidgetDef);
    setWidgetDefs(newList);

    putWidgetDef(newWidgetDef);
  }
  let chartData: any[] = [];
  Object.keys(widgetData).forEach((year) => chartData.push({ ...widgetData[year], 'year': year }));

  const options = widgetData ? Object.keys(widgetData[2020]).map((field) => <Option key={field} value={field}>{field}</Option>) : '';

  const graph = (
    <LineChart width={660} height={320} data={chartData} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
      <Line type="monotone" dataKey={field} stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="year" tick={true} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <>
      <Select className="field-select"
        defaultValue={widgetDef.data.field}
        style={{ width: 280 }}
        size="small"
        onChange={handleChange}>
        {options}
      </Select>
      <div className="widget-content">
        {graph}
      </div>
    </>
  );
}
