<template>
  <dialog-form>
    <v-flex xs12>
      <form-token
        required
        label="资产类型令牌"
        title="用于引用资产类型的唯一标记"
        v-model="token"
        :validator="$v"
      />
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="名称"
        title="显示资产类型名称"
        v-model="name"
        icon="info"
      >
        <span v-if="$v.name.$invalid && $v.$dirty">请填写名称</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text-area
        required
        v-model="description"
        title="资产类型说明"
        label="说明"
        icon="info"
      >
        <span v-if="$v.description.$invalid && $v.$dirty">需要说明</span>
      </form-text-area>
    </v-flex>
    <v-flex xs12>
      <form-select
        required
        title="资产类型所属类别"
        :items="assetCatgories"
        v-model="assetCategory"
        label="资产类别"
        item-text="text"
        item-value="value"
        icon="info"
      >
        <span v-if="$v.assetCategory.$invalid && $v.$dirty">请填写资产类别</span>
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
    assetCategory: {
      required
    }
  }
})
export default class AssetTypeDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  description: string | null = null;
  assetCategory: string | null = null;

  assetCatgories: { text: string; value: string }[] = [
    {
      text: "设备",
      value: "Device"
    },
    {
      text: "人员",
      value: "Person"
    },
    {
      text: "硬件",
      value: "Hardware"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.description = null;
    this.assetCategory = null;
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
    this.assetCategory = (input as any).assetCategory;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      description: this.description,
      assetCategory: this.assetCategory
    };
  }
}
</script>
