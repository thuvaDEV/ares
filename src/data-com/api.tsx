import { WidgetDefinition } from "../store/atoms";

// The Endpoint URL
const serverUrl = "http://localhost:3000/";


  // export enum DataType {
  //   mock: "MOCK",
  //   api: "API"
  // };

const api = {
  widgets: "widgets",
  data: "data",
};

const header = { "Content-Type": "application/json;charset=utf-8" };

export const getWidgetsData = async () => {
  let response = await fetch(serverUrl + api.widgets);
  let data = await response.json();
  return data;
};

export const getData = async () => {
  let response = await fetch(serverUrl + api.data);
  let data = await response.json();
  return data;
};

export const postWidgetData = async (widgetDef:WidgetDefinition) => {
  // Request options
  let options = {
    method: "POST",
    headers: header,
    body: JSON.stringify(widgetDef),
  };
  let response = await fetch(serverUrl + api.widgets, options);
  let data = await response.json();
  return data;
};

export const deleteWidgetData = async (widgetDef:WidgetDefinition) => {
  // Request options
  let options = {
    method: "DELETE",
    headers: header,
  };
  let response = await fetch(
    serverUrl + api.widgets + "/" + widgetDef.id,
    options
  );
  let data = await response.json();
  return data;
};

export const putWidgetData = async (widgetDef:WidgetDefinition) => {
  // Request options
  let options = {
    method: "PUT",
    headers: header,
    body: JSON.stringify(widgetDef),
  };
  let response = await fetch(
    serverUrl + api.widgets + "/" + widgetDef.id,
    options
  );
  let data = await response.json();
  return data;
};