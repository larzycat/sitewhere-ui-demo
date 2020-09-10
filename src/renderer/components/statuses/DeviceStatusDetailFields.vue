<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Token"
        title="引用状态的唯一标记"
        v-model="token"
        icon="info"
      >
        <span v-if="!$v.token.required && $v.$dirty">需要令牌</span>
        <span v-if="!$v.token.validToken && $v.$dirty">令牌无效</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text required label="名称" title="状态名称" v-model="name" icon="info">
        <span v-if="!$v.name.required && $v.$dirty">需要名称</span>
      </form-text>
    </v-flex>
    <v-flex xs12>
      <form-text
        required
        label="状态码"
        title="用于表示状态的代码"
        v-model="code"
        icon="info"
      >
        <span v-if="!$v.code.required && $v.$dirty">需要状态码</span>
      </form-text>
    </v-flex>
    <v-flex xs6>
      <sw-icon-selector v-model="icon"/>
    </v-flex>
    <v-flex xs6>
      <sw-color-input-field text="边框颜色" v-model="borderColor"/>
    </v-flex>
    <v-flex xs6>
      <sw-color-input-field text="背景颜色" v-model="backgroundColor"/>
    </v-flex>
    <v-flex xs6>
      <sw-color-input-field text="前景颜色" v-model="foregroundColor"/>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";

import { required, helpers } from "vuelidate/lib/validators";

// Validation for token.
const validToken = helpers.regex("validToken", /^[a-zA-Z0-9-_]+$/);

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    token: {
      required,
      validToken
    },
    name: {
      required
    },
    code: {
      required
    },
    icon: {
      required
    },
    backgroundColor: {
      required
    },
    foregroundColor: {
      required
    },
    borderColor: {
      required
    }
  }
})
export default class DeviceStatusDetailFields extends DialogSection {
  token: string | null = null;
  name: string | null = null;
  code: string | null = null;
  icon: string | null = null;
  backgroundColor: string | null = null;
  foregroundColor: string | null = null;
  borderColor: string | null = null;

  /** Reset section content */
  reset(): void {
    this.token = null;
    this.name = null;
    this.code = null;
    this.icon = null;
    this.backgroundColor = null;
    this.foregroundColor = null;
    this.borderColor = null;
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
    this.code = (input as any).code;
    this.icon = (input as any).icon;
    this.backgroundColor = (input as any).backgroundColor;
    this.foregroundColor = (input as any).foregroundColor;
    this.borderColor = (input as any).borderColor;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      token: this.token,
      name: this.name,
      code: this.code,
      icon: this.icon,
      backgroundColor: this.backgroundColor,
      foregroundColor: this.foregroundColor,
      borderColor: this.borderColor
    };
  }
}
</script>

<style scoped>
</style>
