<template>
  <sw-delete-dialog
    ref="dialog"
    title="删除设备组"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component, DeleteDialogComponent } from "sitewhere-ide-common";

import { AxiosPromise } from "axios";
import { IDeviceGroup, IDeviceGroupResponseFormat } from "sitewhere-rest-api";
import {
  getDeviceGroup,
  deleteDeviceGroup
} from "../../rest/sitewhere-device-groups-api";

@Component({})
export default class DeviceGroupDeleteDialog extends DeleteDialogComponent<
  IDeviceGroup
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceGroup> {
    let format: IDeviceGroupResponseFormat = {};
    return getDeviceGroup(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(deviceGroup: IDeviceGroup): void {
    this.message = `是否确定要删除'${deviceGroup.name}'?`;
  }

  /** Load payload */
  prepareDelete(deviceGroup: IDeviceGroup): AxiosPromise<IDeviceGroup> {
    return deleteDeviceGroup(this.$store, deviceGroup.token);
  }

  // Called after create button is clicked.
  onDelete(e: any) {
    this.delete();
  }

  // Called after cancel button is clicked.
  onCancel(e: any) {
    this.cancel();
  }
}
</script>

<style scoped>
</style>
