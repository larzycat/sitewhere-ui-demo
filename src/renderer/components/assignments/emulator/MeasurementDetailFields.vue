<template>
  <dialog-form>
    <v-flex xs12>
      <form-text required label="名称" title="测量名称。" v-model="name" icon="info">
        <span v-if="!$v.name.required && $v.$dirty">需要名称</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="Value"
        title="测量值"
        v-model="value"
        type="number"
        icon="info"
      >
        <span v-if="!$v.value.required && $v.$dirty">需要值</span>
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../../common/form/DialogForm.vue";
import FormText from "../../common/form/FormText.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    name: {
      required
    },
    value: {
      required
    }
  }
})
export default class MeasurementDetailFields extends DialogSection {
  name: string | null = null;
  value: number | null = null;

  /** Reset section content */
  reset(): void {
    this.name = null;
    this.value = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.name = (input as any).name;
    this.value = (input as any).value;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      name: this.name,
      value: this.value
    };
  }
}
</script>
