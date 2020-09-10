<template>
  <sw-delete-dialog
    ref="dialog"
    title="删除用户"
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
import { IUser, IUserResponseFormat } from "sitewhere-rest-api";
import { getUser, deleteUser } from "../../rest/sitewhere-users-api";

@Component({})
export default class UserDeleteDialog extends DeleteDialogComponent<IUser> {
  message: string | null = null;

  /** Load payload */
  prepareLoad(identifier: string): AxiosPromise<IUser> {
    let format: IUserResponseFormat = {};
    return getUser(this.$store, identifier, format);
  }

  /** Called after record is loaded */
  afterLoad(user: IUser): void {
    this.message = `是否确定要删除 '${user.firstName} ${
      user.lastName
    }'?`;
  }

  /** Load payload */
  prepareDelete(user: IUser): AxiosPromise<IUser> {
    return deleteUser(this.$store, user.username);
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
