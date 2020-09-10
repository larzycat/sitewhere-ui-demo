<template>
  <dialog-form>
    <v-flex xs12>
      <v-card-text class="subheading">下面选择的设备类型将包含在结果中,如果未选择任何项,则将包括所有设备类型。</v-card-text>
      <device-type-multiselect v-model="deviceTypeTokens" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import DeviceTypeMultiselect from "../devicetypes/DeviceTypeMultiselect.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    DialogForm,
    DeviceTypeMultiselect
  }
})
export default class AssignmentListFilterDeviceTypeFields extends DialogSection {
  deviceTypeTokens: string[] | undefined = [];

  /** Reset section content */
  reset(): void {
    this.deviceTypeTokens = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: IDeviceAssignmentSearchCriteria): void {
    this.deviceTypeTokens = input.deviceTypeTokens;
  }

  /** Save form data to an object */
  save(): IDeviceAssignmentSearchCriteria {
    return {
      deviceTypeTokens: this.deviceTypeTokens
    };
  }
}
</script>
