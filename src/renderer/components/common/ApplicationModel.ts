/**
 * Message that captures an alert (error or informational)
 */
export interface IAlertMessage {
  message: string;
  type: string;
}

/**
 * 连接到远程sitewhere实例所需的信息。
 */
export interface IRemoteConnection {
  id: string;
  name: string;
  protocol: string;
  host: string;
  port: number;
}

/**
 * 有关已知远程站点实例的信息。
 */
export interface IRemotes {
  connections: IRemoteConnection[];
  default: string;
}
