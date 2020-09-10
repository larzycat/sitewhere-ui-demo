<template>
  <assignment-dialog
    ref="dialog"
    title="创建设备分配"
    :device="device"
    createLabel="创建"
    cancelLabel="取消"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  Prop,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import AssignmentDialog from "./AssignmentDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignment,
  IDeviceAssignmentCreateRequest,
  IDevice
} from "sitewhere-rest-api";
import { createDeviceAssignment } from "../../rest/sitewhere-device-assignments-api";

@Component({
  components: {
    AssignmentDialog
  }
})
export default class AssignmentCreateDialog extends CreateDialogComponent<
  IDeviceAssignment,
  IDeviceAssignmentCreateRequest
> {
  @Prop() readonly device!: IDevice;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IDeviceAssignment>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IDeviceAssignment> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IDeviceAssignmentCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IDeviceAssignmentCreateRequest
  ): AxiosPromise<IDeviceAssignment> {
    if (this.device) {
      payload.deviceToken = this.device.token;
    }
    return createDeviceAssignment(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IDeviceAssignment): void {}
}
</script>
