<template>
  <dialog-form>
    <v-flex xs12>
      <v-card-text class="subheading">下面选择的站点将包含在结果中。 如果未选择任何项，则将包括所有站点</v-card-text>
      <area-multiselect v-model="areaTokens" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import AreaMultiselect from "../areas/AreaMultiselect.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    DialogForm,
    AreaMultiselect
  }
})
export default class AssignmentListFilterAreaFields extends DialogSection {
  areaTokens: string[] | undefined = [];

  /** Reset section content */
  reset(): void {
    this.areaTokens = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: IDeviceAssignmentSearchCriteria): void {
    this.areaTokens = input.areaTokens;
  }

  /** Save form data to an object */
  save(): IDeviceAssignmentSearchCriteria {
    return {
      areaTokens: this.areaTokens
    };
  }
}
</script>
