<template>
  <sw-delete-dialog
    ref="dialog"
    title="删除设备类型"
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
import { IDeviceType, IDeviceTypeResponseFormat } from "sitewhere-rest-api";
import {
  getDeviceType,
  deleteDeviceType
} from "../../rest/sitewhere-device-types-api";

@Component({})
export default class DeviceTypeDeleteDialog extends DeleteDialogComponent<
  IDeviceType
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IDeviceType> {
    let format: IDeviceTypeResponseFormat = {};
    return getDeviceType(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(deviceType: IDeviceType): void {
    this.message = `是否确定要删除 '${deviceType.name}'?`;
  }

  /** Load payload */
  prepareDelete(deviceType: IDeviceType): AxiosPromise<IDeviceType> {
    return deleteDeviceType(this.$store, deviceType.token);
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
