import { WidgetDefinition } from "../store/atoms";

// The JSON SERVER Endpoint 
const serverUrl = "http://localhost:3000/"; // TODO: change it to firebase api

export enum DataType {
  Mock = "MOCK",
  API = "API"
};

export const env = DataType.Mock;

export const isMock = () => { return env === DataType.Mock }

const api = {
  widgets: "widgets",
  data: "data",
};

const header = { "Content-Type": "application/json;charset=utf-8" };

export const getWidgetsDefs = async () => {
  let response = await fetch(serverUrl + api.widgets);
  let data = await response.json();
  return data;
};

export const postWidgetDef = async (widgetDef: WidgetDefinition) => {
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

export const deleteWidgetDef = async (widgetDef: WidgetDefinition) => {
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

export const putWidgetDef = async (widgetDef: WidgetDefinition) => {
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

export const getWidgetsData = async () => {
  let response = await fetch(serverUrl + api.data);
  let data = await response.json();
  return data;
};
