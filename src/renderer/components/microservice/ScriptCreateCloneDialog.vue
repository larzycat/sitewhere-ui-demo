<template>
  <script-clone-dialog
    ref="dialog"
    title="克隆脚本"
    width="700"
    resetOnOpen="true"
    :identifier="identifier"
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

import ScriptCloneDialog from "./ScriptCloneDialog.vue";

import { IScriptVersion } from "sitewhere-rest-api";

@Component({
  components: {
    ScriptCloneDialog
  }
})
export default class ScriptCreateCloneDialog extends CreateDialogComponent<
  IScriptVersion,
  IScriptVersion
> {
  @Prop() readonly identifier!: string;
  @Prop() readonly tenantToken!: string;

  // References.
  $refs!: Refs<{
    dialog: DialogComponent<any>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IScriptVersion> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IScriptVersion): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IScriptVersion): IScriptVersion {
    return payload;
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IScriptVersion): void {
    this.$emit("save", payload);
  }
}
</script>
