<template>
  <sw-delete-dialog
    ref="dialog"
    title="删除用户类型"
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
import { ICustomerType, ICustomerTypeResponseFormat } from "sitewhere-rest-api";
import {
  getCustomerType,
  deleteCustomerType
} from "../../rest/sitewhere-customer-types-api";

@Component({})
export default class CustomerTypeDeleteDialog extends DeleteDialogComponent<
  ICustomerType
> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<ICustomerType> {
    let format: ICustomerTypeResponseFormat = {};
    return getCustomerType(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(type: ICustomerType): void {
    this.message = `是否确定要删除 '${type.name}'?`;
  }

  /** Load payload */
  prepareDelete(type: ICustomerType): AxiosPromise<ICustomerType> {
    return deleteCustomerType(this.$store, type.token);
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
