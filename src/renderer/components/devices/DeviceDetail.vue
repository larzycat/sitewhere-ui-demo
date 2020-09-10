<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="Loading device ..."
    :loaded="loaded"
    :record="device"
  >
    <template slot="header">
      <device-detail-header :record="device" @deviceDeleted="onDeviceDeleted"/>
    </template>
    <template slot="tabs">
      <v-tab key="assignments">分配历史记录</v-tab>
    </template>
    <template slot="tab-items">
      <device-assignment-history tabkey="assignments" :deviceToken="token"/>
    </template>
    <template slot="actions">
      <!-- 编辑设备内元数据 -->
      <edit-button tooltip="编辑设备" @action="onEdit"/>
      <delete-button tooltip="删除设备" @action="onDelete"/>
    </template>
    <template slot="dialogs">
      <device-update-dialog ref="edit" :token="token" @deviceUpdated="onDeviceUpdated"/>
      <device-delete-dialog ref="delete" :token="token" @deleted="onDeviceDeleted"/>
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

import DeviceDetailHeader from "./DeviceDetailHeader.vue";
import DeviceAssignmentHistory from "./DeviceAssignmentHistory.vue";
import DeviceUpdateDialog from "./DeviceUpdateDialog.vue";
// 删除设备对话框
import DeviceDeleteDialog from "./DeviceDeleteDialog.vue";
// 打开编辑设备窗口
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getDevice } from "../../rest/sitewhere-devices-api";
import { IDevice, IDeviceResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    DeviceDetailHeader,
    DeviceAssignmentHistory,
    DeviceUpdateDialog,
    DeviceDeleteDialog,
    EditButton,
    DeleteButton
  }
})
export default class DeviceDetail extends DetailComponent<IDevice> {
  // References.
  $refs!: Refs<{
    edit: DeviceUpdateDialog;   //实例化更新/取消
    delete: DeviceDeleteDialog;
  }>;

  get device(): IDevice | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Device;
  }

  get title(): string {
    return this.device ? `Manage device ${this.device.token}` : "Manage device";
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDevice> {
    let format: IDeviceResponseFormat = {
      includeDeviceType: true,
      includeAssignment: true
    };
    return getDevice(this.$store, token, format);
  }

  // Called after data is loaded.
  // 在加载数据后调用
  afterRecordLoaded(device: IDevice) {
    var section: INavigationSection = {
      id: "devices",
      title: "设备",
      icon: NavigationIcon.Device,
      route: "/admin/devices/" + device.token,
      longTitle: "管理设备: " + device.token
    };
    this.$store.commit("currentSection", section);
  }

  // Open dialog to edit device.
  // 打开对话框以编辑设备。
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called after update.
  onDeviceUpdated() {
    this.refresh();
  }
  //打开对话框删除设备 
  // Open dialog to delete device.
  onDelete() {
    if (this.token) {
      this.$refs.delete.open(this.token);
    }
  }

  // Called after device is deleted.
  onDeviceDeleted() {
    routeTo(this, "/devices");
  }
}
</script>

<style scoped>
</style>
