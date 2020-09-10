<template>
  <dialog-form>
    <v-flex xs12>
      <v-card-text class="subheading">下面选择的用户将包含在结果中。 如果未选择任何项目，则将包括所有用户。</v-card-text>
      <customer-multiselect v-model="customerTokens" />
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import CustomerMultiselect from "../customers/CustomerMultiselect.vue";

import { IDeviceAssignmentSearchCriteria } from "sitewhere-rest-api";

@Component({
  components: {
    DialogForm,
    CustomerMultiselect
  }
})
export default class AssignmentListFilterCustomerFields extends DialogSection {
  customerTokens: string[] | undefined = [];

  /** Reset section content */
  reset(): void {
    this.customerTokens = [];
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: IDeviceAssignmentSearchCriteria): void {
    this.customerTokens = input.customerTokens;
  }

  /** Save form data to an object */
  save(): IDeviceAssignmentSearchCriteria {
    return {
      customerTokens: this.customerTokens
    };
  }
}
</script>
