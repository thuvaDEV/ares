import { atom } from "recoil";

export const widgetType = {
  notes: "NOTES",
  chart: "CHART",
  default: "DEFAULT",
};

export const widgetDefsState = atom({
  key: "widgetDefsState",
  default: [],
} as { key: string, default: WidgetDefinition[] });

export const widgetDefState = atom({
  key: "widgetDefState",
  default: {},
} as { key: string, default: WidgetDefinition });

export const editModalVisibleState = atom({
  key: "editModalVisibleState",
  default: false,
});

export const deleteModalVisibleState = atom({
  key: "deleteModalVisibleState",
  default: false,
});

export const gridLayoutState = atom({
  key: "gridLayoutState",
  default: [],
})

export const widgetDataState = atom({
  key: "widgetDataState",
  default: {},
});


export interface WidgetDefinition {
  id: string;
  x: 25,
  "y": 0,
  "w": 24,
  "h": 25,
  "minW": 10,
  "title": "Canada's Economy",
  "type": "SUMMARY",
  "data": any
  "moved": false,
  "static": false
}