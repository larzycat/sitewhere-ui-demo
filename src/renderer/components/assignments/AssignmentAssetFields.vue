<template>
  <dialog-form>
    <v-flex xs12>
      <v-card flat>
        <v-checkbox label="将设备分配给资产？" v-model="assign" light></v-checkbox>
        <v-divider v-if="assign" />
        <asset-chooser
          v-if="assign"
          v-model="token"
          notChosenText="在下面选择要分配的资产:"
          chosenText="下面的资产将被分配:"
        />
      </v-card>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import AssetChooser from "../assets/AssetChooser.vue";

@Component({
  components: {
    DialogForm,
    AssetChooser
  }
})
export default class AssignmentAssetFields extends DialogSection {
  token: string | null = null;
  assign: boolean = false;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.assign = false;
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.token = (input as any).assetToken;
    if (this.token) {
      this.assign = true;
    }
  }

  /** Save form data to an object */
  save(): {} {
    return {
      assetToken: this.token
    };
  }
}
</script>
