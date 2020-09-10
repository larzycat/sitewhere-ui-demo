<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="正在加载工作分配..."
    :loaded="loaded"
    :record="assignment"
  >
    <template slot="header">
      <assignment-detail-header :record="assignment" @statusUpdated="refresh" />
    </template>
    <template slot="tabs">
      <!-- 标签栏 -->
      <v-tab key="locations">位置</v-tab>
      <v-tab key="measurements">测量</v-tab>
      <v-tab key="alerts">警告</v-tab>
      <v-tab key="invocations">命令调用</v-tab>
      <v-tab key="responses">命令响应</v-tab>
      <v-tab key="livedata">实时数据</v-tab>
      <v-tab key="association">设备关联</v-tab>
    </template>
    <template slot="tab-items">
      <!-- <v-tab-item v-for="n in 3" :key="n"> -->
      <!-- 选项卡组 -->
      <assignment-location-events tabkey="locations" :token="token" />
      <assignment-measurement-events tabkey="measurements" :token="token" />
      <assignment-alert-events tabkey="alerts" :token="token" />
      <assignment-invocation-events tabkey="invocations" :token="token" />
      <assignment-response-events tabkey="responses" :token="token" />
    </template>
    <!-- 新增实时数据 -->
    <template slot="tab-items">
      <v-tab-item>
        <assignment-live-data tabkey="livedata" :token="token"  :assignment="assignment" />
      </v-tab-item>
    </template>
    <!-- 新增设备关联 -->
    <template slot="tab-items">
      <v-tab-item v-for="n in 1" :key="n">
        <device-association tabkey="association" :token="token" />
      </v-tab-item>
    </template>

    <template slot="dialogs">
      <invocation-create-dialog
        ref="invoke"
        :assignmentToken="token"
        :deviceTypeToken="deviceTypeToken"
        @invocationAdded="onInvocationAdded"
      />
      <assignment-delete-dialog
        ref="delete"
        :token="token"
        @assignmentDeleted="onAssignmentDeleted"
      />
    </template>
    <template slot="actions">
      <device-command-button tooltip="调用命令" @action="onAddCommandInvocation" />
      <emulator-button tooltip="设备模拟器" @action="onOpenEmulator" />
      <delete-button tooltip="删除工作分配" @action="onAssignmentDelete" />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import AssignmentDetailHeader from "./AssignmentDetailHeader.vue";
// 注册位置组件
import AssignmentLocationEvents from "./AssignmentLocationEvents.vue";
// 位置测量
import AssignmentMeasurementEvents from "./AssignmentMeasurementEvents.vue";
import AssignmentAlertEvents from "./AssignmentAlertEvents.vue";
import AssignmentInvocationEvents from "./AssignmentInvocationEvents.vue";
// 命令响应
import AssignmentResponseEvents from "./AssignmentResponseEvents.vue";
import AssignmentDeleteDialog from "./AssignmentDeleteDialog.vue";
import InvocationCreateDialog from "./InvocationCreateDialog.vue";
import DeviceCommandButton from "../common/navbuttons/DeviceCommandButton.vue";
import EmulatorButton from "../common/navbuttons/EmulatorButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";
// 实时数据
import AssignmentLiveData from "./AssignmentLiveData.vue";
// 设备关联
import DeviceAssociation from "./DeviceAssociation.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
// 引入标题
import { NavigationIcon } from "../../libraries/constants";
import { getDeviceAssignment } from "../../rest/sitewhere-device-assignments-api";
import {
  IDevice,
  IDeviceType,
  IDeviceAssignment,
  IDeviceAssignmentResponseFormat
} from "sitewhere-rest-api";

@Component({
  components: {
    AssignmentDetailHeader,
    AssignmentLocationEvents,
    AssignmentMeasurementEvents,
    AssignmentAlertEvents,
    AssignmentInvocationEvents,
    AssignmentResponseEvents,
    AssignmentDeleteDialog,
    InvocationCreateDialog,
    DeviceCommandButton,
    EmulatorButton,
    DeleteButton,
    AssignmentLiveData,
    DeviceAssociation
  }
})
export default class AssignmentDetail extends DetailComponent<
  IDeviceAssignment
> {
  // References.
  $refs!: Refs<{
    edit: null;
    delete: null;
    invoke: InvocationCreateDialog;
  }>;

  /** Record as assignment
   * 记录为分配
   */
  get assignment(): IDeviceAssignment | null {
    return this.record;
  }

  /** Device for assignment
   * 分配设备
   */
  get device(): IDevice | null {
    return this.assignment ? (this.assignment as any).device : null;
  }

  /** Device type for assignment
   * 分配的设备类型
   */
  get deviceType(): IDeviceType | null {
    return this.device ? (this.device as any).deviceType : null;
  }

  /** Device type token for assignment
   * 用于分配的设备类型标记
   */
  get deviceTypeToken(): string | null {
    return this.deviceType ? this.deviceType.token : null;
  }

  /** Icon for page
   * 页面图标
   */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceAssignment;
  }

  /** Get page title
   * 获取页面标题
   */
  get title(): string {
    return this.assignment ? this.assignment.token : "";
  }

  /** Load record
   * 负荷记录
   */
  loadRecord(token: string): AxiosPromise<IDeviceAssignment> {
    let format: IDeviceAssignmentResponseFormat = {
      includeDevice: true
    };
    return getDeviceAssignment(this.$store, token, format);
  }

  // Called after data is loaded.
  // 加载数据后调用
  afterRecordLoaded(assignment: IDeviceAssignment) {
    var section: INavigationSection = {
      id: "assignments",
      title: "Assignments",
      icon: NavigationIcon.DeviceAssignment,
      route: "/admin/assignments/" + assignment.token,
      longTitle: "Manage Assignment: " + assignment.token
    };
    this.$store.commit("currentSection", section);
  }

  onAssignmentDelete() {
    console.log("Would be deleting assignment");
  }

  // Called when site is deleted.
  // 删除站点时调用。
  onAssignmentDeleted() {
    routeTo(this, "/areas");
  }

  /** Called to open assignment emulator
   * 调用以打开分配仿真器
   */
  onOpenEmulator() {
    routeTo(this, "/assignments/" + this.$data.token + "/emulator");
  }

  /** Called to create command invocation
   * 调用以创建命令调用
   */
  onAddCommandInvocation() {
    this.$refs.invoke.open();
  }

  /** Called after invocation is added
   * 添加调用后调用
   */
  onInvocationAdded() {
    console.log("Invocation added");
  }
}
</script>
