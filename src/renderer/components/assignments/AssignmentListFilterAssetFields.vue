<template>
  <dialog-form>
    <v-flex xs12>
      <v-card-text class="subheading">下面选择的资产将包含在结果中。 如果未选择任何项，则将包括所有资产。</v-card-text>
      <asset-multiselect v-model="assetTokens" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import AssetMultiselect from "../assets/AssetMultiselect.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    DialogForm,
    AssetMultiselect
  }
})
export default class AssignmentListFilterAssetFields extends DialogSection {
  assetTokens: string[] | undefined = [];

  /** Reset section content */
  reset(): void {
    this.assetTokens = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: IDeviceAssignmentSearchCriteria): void {
    this.assetTokens = input.assetTokens;
  }

  /** Save form data to an object */
  save(): IDeviceAssignmentSearchCriteria {
    return {
      assetTokens: this.assetTokens
    };
  }
}
</script>
