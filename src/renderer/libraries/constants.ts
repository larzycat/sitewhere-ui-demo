import { ITableHeaders, IPageSizes } from "sitewhere-ide-common";
import { ParameterType } from "sitewhere-rest-api";

/**
 * Enumeration of navigation icons.
 * 导航图标的枚举。
 */
export enum NavigationIcon {
  Tenant = "layers",
  User = "people",
  Global = "language",
  Device = "developer_board",
  DeviceType = "settings",
  DeviceAssignment = "link",
  DeviceCommand = "call_made",
  DeviceStatus = "warning",
  DeviceGroup = "apps",
  Customer = "account_balance",
  CustomerType = "settings",
  Area = "collections",
  AreaType = "settings",
  Asset = "devices_other",
  AssetType = "settings",
  BatchOperation = "view_module",
  Schedule = "access_alarm",
  Zone = "timeline",
  Location = "room",
  Alert = "warning",
  Measurement = "ballot",
  Emulator = "settings_remote",
  Add = "add_circle",
  Edit = "create",
  Delete = "delete_forever",
  Filter = "filter_list",
  Up = "arrow_upward",
  Script = "description",
  Remotes = "router"
}

// Page sizes shown for event list pages.
export const EventPageSizes: IPageSizes = [
  {
    text: "25",
    value: 25
  },
  {
    text: "50",
    value: 50
  },
  {
    text: "100",
    value: 100
  }
];

// Table headers used for device locations.
export const LocationHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "资产",
    value: "asset"
  },
  {
    align: "left",
    sortable: false,
    text: "纬度/经度/海拔",
    value: "lle"
  },
  {
    align: "left",
    sortable: false,
    text: "开始日期",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "接收日期",
    value: "received"
  }
];

// Table headers used for device locations.
//用于设备位置的表头。
export const AssignmentLocationHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "纬度/经度/海拔",
    value: "lle"
  },
  {
    align: "left",
    sortable: false,
    text: "开始日期",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "接收日期",
    value: "received"
  }
];

// Table headers used for device measurements.
export const MeasurementHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "资产",
    value: "asset"
  },
  {
    align: "left",
    sortable: false,
    text: "测量名称",
    value: "mxname"
  },
  {
    align: "left",
    sortable: false,
    text: "测量值",
    value: "mxvalue"
  },
  {
    align: "left",
    sortable: false,
    text: "开始日期",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "接收日期",
    value: "received"
  }
];

// Table headers used for device measurements.
// 用于设备测量的表头
export const AssignmentMeasurementHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "测量值",
    value: "mxvalue"
    // value: "mxname"
  },
  // {
  //   align: "left",
  //   sortable: false,
  //   text: "测量值",
  //   value: "mxvalue"
  // },
  {
    align: "left",
    sortable: false,
    text: "开始日期",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "接收日期",
    value: "received"
  }
];

// Table headers used for device alerts.
export const AlertHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "资产",
    value: "asset"
  },
  {
    align: "left",
    sortable: false,
    text: "类型",
    value: "type"
  },
  {
    align: "left",
    sortable: false,
    text: "消息",
    value: "message"
  },
  {
    align: "left",
    sortable: false,
    text: "开始日期",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "接收日期",
    value: "received"
  }
];

// Table headers used for device alerts.
export const AssignmentAlertHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "类型",
    value: "type"
  },
  {
    align: "left",
    sortable: false,
    text: "消息",
    value: "message"
  },
  {
    align: "left",
    sortable: false,
    text: "开始日期",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "接收日期",
    value: "received"
  }
];

// Table headers used for device command responses.
// 用于设备命令响应的表头。
export const ResponseHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "事件ID",
    value: "oeid"
  },
  {
    align: "left",
    sortable: false,
    text: "响应",
    value: "response"
  },
  {
    align: "left",
    sortable: false,
    text: "开始日期",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "接收日期",
    value: "received"
  }
];

// Table headers used for device command invocations.
export const InvocationHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "命令",
    value: "command"
  },
  {
    align: "left",
    sortable: false,
    text: "信息源",
    value: "source"
  },
  {
    align: "left",
    sortable: false,
    text: "目标",
    value: "target"
  },
  {
    align: "left",
    sortable: false,
    text: "开始日期",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "接收日期",
    value: "received"
  }
];

// Command parameter types.
// 命令参数类型。
export const ParameterTypes: {
  text: string;
  datatype: ParameterType;
}[] = [
  {
    text: "String",
    datatype: ParameterType.String
  },
  {
    text: "Double",
    datatype: ParameterType.Double
  },
  {
    text: "Float",
    datatype: ParameterType.Float
  },
  {
    text: "Boolean",
    datatype: ParameterType.Bool
  },
  {
    text: "Int32",
    datatype: ParameterType.Int32
  },
  {
    text: "Int64",
    datatype: ParameterType.Int64
  },
  {
    text: "UInt32",
    datatype: ParameterType.UInt32
  },
  {
    text: "UInt64",
    datatype: ParameterType.UInt64
  },
  {
    text: "SInt32",
    datatype: ParameterType.SInt32
  },
  {
    text: "SInt64",
    datatype: ParameterType.SInt64
  },
  {
    text: "Fixed32",
    datatype: ParameterType.Fixed32
  },
  {
    text: "Fixed64",
    datatype: ParameterType.Fixed64
  },
  {
    text: "SFixed32",
    datatype: ParameterType.SFixed32
  },
  {
    text: "SFixed64",
    datatype: ParameterType.SFixed64
  }
];
