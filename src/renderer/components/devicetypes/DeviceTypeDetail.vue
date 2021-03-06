<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="正在加载设备类型..."
    :loaded="loaded"
    :record="deviceType"
  >
    <template slot="header">
      <device-type-detail-header
        :record="deviceType"
        @deviceTypeDeleted="onDeleted"
        @deviceTypeUpdated="onUpdated"
      />
    </template>
    <template slot="tabs">
      <v-tab key="commands">命令</v-tab>
      <v-tab key="statuses">设备状态</v-tab>
      <!--
      <v-tab key="code">Code Generation</v-tab>
      -->
      <v-tab v-if="containerPolicy === 'Composite'" key="composition">组成</v-tab>
    </template>
    <template slot="tab-items">
      <device-type-commands tabkey="commands" ref="commands" :deviceTypeToken="token" />
      <device-type-statuses tabkey="statuses" ref="statuses" :deviceTypeToken="token" />
      <!--
      <device-type-codegen tabkey="code" id="code" :deviceType="deviceType"/>
      -->
      <device-type-composition tabkey="composition" :deviceType="deviceType" />
    </template>
    <template slot="actions">
      <device-command-button tooltip="创建命令" @action="onCommandCreate" />
      <device-status-button tooltip="创建状态" @action="onStatusCreate" />
      <edit-button tooltip="编辑设备类型" @action="onEdit" />
      <delete-button tooltip="删除设备类型" @action="onDelete" />
    </template>
    <template slot="dialogs">
      <device-type-update-dialog ref="edit" :token="token" @deviceTypeUpdated="onUpdated" />
      <device-type-delete-dialog ref="delete" :token="token" @deviceTypeDeleted="onDeleted" />
      <command-create-dialog ref="command" :deviceTypeToken="token" @commandAdded="onCommandAdded" />
      <device-status-create-dialog
        ref="status"
        :deviceTypeToken="token"
        @statusAdded="onStatusAdded"
      />
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

import DeviceTypeDetailHeader from "./DeviceTypeDetailHeader.vue";
import DeviceTypeCommands from "./DeviceTypeCommands.vue";
import DeviceTypeStatuses from "./DeviceTypeStatuses.vue";
import DeviceTypeComposition from "./DeviceTypeComposition.vue";
// 删除设备类型对话框组件
import DeviceTypeDeleteDialog from "./DeviceTypeDeleteDialog.vue";
import DeviceTypeUpdateDialog from "./DeviceTypeUpdateDialog.vue";
import CommandCreateDialog from "../commands/CommandCreateDialog.vue";
import DeviceStatusCreateDialog from "../statuses/DeviceStatusCreateDialog.vue";
import DeviceCommandButton from "../common/navbuttons/DeviceCommandButton.vue";
import DeviceStatusButton from "../common/navbuttons/DeviceStatusButton.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getDeviceType } from "../../rest/sitewhere-device-types-api";
import {
  IDeviceType,
  IDeviceTypeResponseFormat,
  DeviceContainerPolicy
} from "sitewhere-rest-api";

@Component({
  components: {
    DeviceTypeDetailHeader,
    DeviceTypeCommands,
    DeviceTypeStatuses,
    DeviceTypeComposition,
    DeviceTypeDeleteDialog,
    DeviceTypeUpdateDialog,
    CommandCreateDialog,
    DeviceStatusCreateDialog,
    DeviceCommandButton,
    DeviceStatusButton,
    EditButton,
    DeleteButton
  }
})
export default class DeviceTypeDetail extends DetailComponent<IDeviceType> {
  active: string | null = null;

  // References.
  $refs!: Refs<{
    command: CommandCreateDialog;
    status: DeviceStatusCreateDialog;
    edit: DeviceTypeUpdateDialog;
    delete: DeviceTypeDeleteDialog;
  }>;

  get deviceType(): IDeviceType | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceType;
  }

  get title(): string {
    return this.deviceType
      ? `管理设备类型 "${this.deviceType.name}"`
      : "管理设备类型";
  }

  get containerPolicy(): DeviceContainerPolicy {
    return this.deviceType
      ? this.deviceType.containerPolicy
      : DeviceContainerPolicy.Standalone;
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IDeviceType> {
    let format: IDeviceTypeResponseFormat = {
      includeAsset: true
    };
    return getDeviceType(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(deviceType: IDeviceType) {
    var section: INavigationSection = {
      id: "devicetypes",
      title: "设备类型",
      icon: "map",
      route: "/admin/devicetypes/" + deviceType.token,
      longTitle: "管理设备类型" + deviceType.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called on command create.
  onCommandCreate() {
    this.$refs.command.open();
  }

  // Called on status create.
  onStatusCreate() {
    this.$refs.status.open();
  }

  // Called to open area edit dialog.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  // Called after update.
  onUpdated() {
    this.refresh();
  }

  onDelete() {
    if (this.token) {
      this.$refs.delete.open(this.token);
    }
  }

  // Called after delete.
  onDeleted() {
    routeTo(this, "/devicetypes");
  }

  // Called after a command is added.
  onCommandAdded() {
    (this.$refs["commands"] as any).refresh();
  }

  // Called after a status is added.
  onStatusAdded() {
    (this.$refs["statuses"] as any).refresh();
  }
}
</script>

<style scoped>
</style>
