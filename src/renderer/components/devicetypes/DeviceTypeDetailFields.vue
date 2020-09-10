<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="设备类型令牌"
        title="用于引用设备类型的唯一标记"
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="名称"
        title="显示设备类型的名称"
        v-model="name"
        icon="info"
      >
        <span v-if="$v.name.$invalid && $v.$dirty">名称是必需的</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text-area
        required
        v-model="description"
        title="设备类型说明"
        label="说明"
        icon="info"
      >
        <span v-if="$v.description.$invalid && $v.$dirty">需要说明</span>
      </form-text-area>
    </v-flex>
    <v-flex xs12>
      <form-select
        required
        title="用于初始租户配置的模板"
        :items="containerPolicies"
        v-model="containerPolicy"
        label="容器政策"
        item-text="text"
        item-value="value"
        icon="developer_board"
      >
        <span v-if="$v.containerPolicy.$invalid && $v.$dirty">Container policy is required.</span>
      </form-select>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormToken from "../common/form/FormToken.vue";
import FormText from "../common/form/FormText.vue";
import FormTextArea from "../common/form/FormTextArea.vue";
import FormSelect from "../common/form/FormSelect.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormToken,
    FormText,
    FormTextArea,
    FormSelect
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    description: {
      required
    },
    containerPolicy: {
      required
    }
  }
})
export default class DeviceTypeDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  description: string | null = null;
  containerPolicy: string | null = null;

  containerPolicies: { text: string; value: string }[] = [
    {
      text: "独立设备",
      value: "Standalone"
    },
    {
      text: "复合设备",
      value: "Composite"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.description = null;
    this.containerPolicy = null;
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.token = (input as any).token;
    this.name = (input as any).name;
    this.description = (input as any).description;
    this.containerPolicy = (input as any).containerPolicy;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      description: this.description,
      containerPolicy: this.containerPolicy
    };
  }
}
</script>

<style scoped>
</style>
