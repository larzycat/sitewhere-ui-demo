<template>
  <sw-list-page
    :icon="icon"
    title="设备管理"
    loadingMessage="正在加载设备..."
    :loaded="loaded"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs6 v-for="(device) in matches" :key="device.token">
        <device-list-entry :device="device" @assign="onAssignDevice" @open="onOpenDevice" />
      </v-flex>
    </sw-list-layout>
    <template slot="filters">
      <device-list-filter-bar ref="filters" :criteria="filter" @clear="onClearFilterCriteria" />
    </template>
    <template slot="noresults">
      <no-results-panel>
        <div>尚未为此租户创建任何设备</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{addIcon}}</v-icon>在工具栏中添加设备
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <device-create-dialog ref="add" @deviceAdded="onDeviceAdded" />
      <assignment-create-dialog ref="assign" :device="selected" @created="onAssignmentCreated" />
      <invocation-by-device-criteria-create-dialog :filter="filter" ref="batch" />
      <device-list-filter-dialog ref="filter" @payload="onFilterUpdated" />
    </template>
    <template slot="actions">
      <!-- 调用onAddDevice -------------------------------------------- -->
      <add-button tooltip="创建设备" @action="onAddDevice" />
      <device-command-button
        v-if="filter.deviceTypeToken"
        tooltip="执行批处理命令"
        @action="onBatchCommandInvocation"
      />
      <filter-button tooltip="搜索设备列表" @action="onShowFilterCriteria" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import {
  Component,
  ListComponent,
  IPageSizes,
  Refs
} from "sitewhere-ide-common";

import DeviceListEntry from "./DeviceListEntry.vue";
import DeviceListFilterBar from "./DeviceListFilterBar.vue";
import DeviceListFilterDialog from "./DeviceListFilterDialog.vue";
import DeviceCreateDialog from "./DeviceCreateDialog.vue";
import AssignmentCreateDialog from "../assignments/AssignmentCreateDialog.vue";
import InvocationByDeviceCriteriaCreateDialog from "../batch/InvocationByDeviceCriteriaCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import DeviceCommandButton from "../common/navbuttons/DeviceCommandButton.vue";
import FilterButton from "../common/navbuttons/FilterButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { NavigationIcon } from "../../libraries/constants";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listDevices } from "../../rest/sitewhere-devices-api";
import {
  IDevice,
  IDeviceSearchCriteria,
  IDeviceResponseFormat,
  IDeviceSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    DeviceListEntry,
    DeviceListFilterBar,
    DeviceListFilterDialog,
    DeviceCreateDialog,
    AssignmentCreateDialog,
    InvocationByDeviceCriteriaCreateDialog,
    AddButton,
    DeviceCommandButton,
    FilterButton,
    NoResultsPanel
  }
})
export default class DevicesList extends ListComponent<
  IDevice,
  IDeviceSearchCriteria,
  IDeviceResponseFormat,
  IDeviceSearchResults
> {
  $refs!: Refs<{
    // onAddDevice调用add中的方法
    add: DeviceCreateDialog;
    assign: AssignmentCreateDialog;
    filter: DeviceListFilterDialog;
    batch: InvocationByDeviceCriteriaCreateDialog;
  }>;

  addIcon: string = NavigationIcon.Add;

  selected: IDevice | null = null;
  filter: IDeviceSearchCriteria = {};
  pageSizes: IPageSizes = [
    {
      text: "20",
      value: 20
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

  /** Get page icon */
  // 获取页面图标 
  get icon(): NavigationIcon {
    return NavigationIcon.Device;
  }

  /** Build search criteria for list
   * 为列表生成搜索条件
   */
  buildSearchCriteria(): IDeviceSearchCriteria {
    return this.filter;
  }

  /** Build response format for list
   * 为列表生成响应格式
   */
  buildResponseFormat(): IDeviceResponseFormat {
    let format: IDeviceResponseFormat = {};
    format.includeDeviceType = true;
    format.includeAssignment = true;
    return format;
  }

  /** Perform search
   * 执行搜索
   */
  performSearch(
    criteria: IDeviceSearchCriteria,
    format: IDeviceResponseFormat
  ): AxiosPromise<IDeviceSearchResults> {
    return listDevices(this.$store, criteria, format);
  }

  /** Called to show filter criteria dialog 
   * 调用以显示搜索条件对话框
  */
  onShowFilterCriteria() {
    this.$refs.filter.openDialog();
  }

  /** Clears the filter criteria 
   * 清除筛选条件
  */
  onClearFilterCriteria() {
    this.filter = {};
    this.$refs.filter.reset();
    this.refresh();
  }

  /** Called when filter criteria are updated 
   * 更新搜索条件时调用
  */
  onFilterUpdated(filter: IDeviceSearchCriteria) {
    this.$refs.filter.closeDialog();
    this.filter = filter;
    this.refresh();
  }

  /** Open device assignment dialog
   * 打开设备分配对话框
   */
  onAssignDevice(device: IDevice) {
    this.selected = device;
    this.$refs.assign.open();
  }

  /** 创建新分配后调用 */
  onAssignmentCreated() {
    this.refresh();
  }

  /** Called when a new device is added 
   * 添加新设备时调用
  */
  onDeviceAdded() {
    this.refresh();
  }

  /** Called to open detail page for device */
  // --------------------------- 调用以打开设备的详细信息页 ------------------------------
  onOpenDevice(device: IDevice) {
    routeTo(this, "/devices/" + device.token);
  }

  /** Called to open dialog */
  // --------------------------- 调用以打开对话框 ----------------------------
  onAddDevice() {
    this.$refs.add.open();
  }

  /** Called to invoke a batch command */
  // 调用以调用批处理命令
  onBatchCommandInvocation() {
    this.$refs.batch.open();
  }
}
</script>
