<template>
  <asset-type-dialog
    ref="dialog"
    title="创建资产类型"
    resetOnOpen="true"
    createLabel="创建"
    cancelLabel="取消"
    @payload="onCommit"
  />
</template>

<script lang="ts">
import {
  Component,
  CreateDialogComponent,
  DialogComponent,
  Refs
} from "sitewhere-ide-common";

import AssetTypeDialog from "./AssetTypeDialog.vue";

import { AxiosPromise } from "axios";
import { IAssetType, IAssetTypeCreateRequest } from "sitewhere-rest-api";
import { createAssetType } from "../../rest/sitewhere-asset-types-api";

@Component({
  components: {
    AssetTypeDialog
  }
})
export default class AssetTypeCreateDialog extends CreateDialogComponent<
  IAssetType,
  IAssetTypeCreateRequest
> {
  // References.
  $refs!: Refs<{
    dialog: DialogComponent<IAssetType>;
  }>;

  /** Get wrapped dialog */
  getDialog(): DialogComponent<IAssetType> {
    return this.$refs.dialog;
  }

  /** Called on payload commit */
  onCommit(payload: IAssetTypeCreateRequest): void {
    this.commit(payload);
  }

  /** Implemented in subclasses to save payload */
  save(payload: IAssetTypeCreateRequest): AxiosPromise<IAssetType> {
    return createAssetType(this.$store, payload);
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: IAssetType): void {
    this.$emit("assetTypeAdded", payload);
  }
}
</script>
