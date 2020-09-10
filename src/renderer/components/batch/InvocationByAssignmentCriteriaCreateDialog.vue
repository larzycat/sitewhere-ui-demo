<template>
  <invocation-by-assignment-criteria-dialog
    ref="dialog"
    title="调用批处理命令"
    width="600"
    :filter="filter"
    createLabel="引用"
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

import InvocationByAssignmentCriteriaDialog from "./InvocationByAssignmentCriteriaDialog.vue";

import { AxiosPromise } from "axios";
import {
  IDeviceAssignmentSearchCriteria,
  IInvocationByAssignmentCriteriaRequest,
  IBatchOperation
} from "sitewhere-rest-api";
import { createInvocationsByAssignmentCriteria } from "../../rest/sitewhere-batch-operations-api";

@Component({
  components: {
    InvocationByAssignmentCriteriaDialog
  }
})
export default class InvocationByAssignmentCriteriaCreateDialog extends CreateDialogComponent<
  IBatchOperation,
  IInvocationByAssignmentCriteriaRequest
> {
  @Prop() readonly filter!: IDeviceAssignmentSearchCriteria;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IBatchOperation>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IBatchOperation> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IInvocationByAssignmentCriteriaRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(
    payload: IInvocationByAssignmentCriteriaRequest
  ): AxiosPromise<IBatchOperation> {
    return createInvocationsByAssignmentCriteria(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IBatchOperation): void {}
}
</script>
