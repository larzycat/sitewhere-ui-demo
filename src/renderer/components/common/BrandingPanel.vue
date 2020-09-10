<template>
  <dialog-form>
    <v-flex xs12>
      <form-text title="指向图像的URL" label="图像 URL" v-model="imageUrl" icon="image">
        <span v-if="!$v.imageUrl.url && $v.$dirty">图像URL无效</span>
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
import FormSelect from "../common/form/FormSelect.vue";

import { url } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText,
    FormSelect
  },
  validations: {
    imageUrl: { url }
  }
})
export default class BrandingPanel extends DialogSection {
  imageUrl: string | null = null;
  icon: string | null = null;
  backgroundColor: string | null = null;
  foregroundColor: string | null = null;
  borderColor: string | null = null;

  /** Reset section content */
  reset(): void {
    this.imageUrl = null;
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
    this.imageUrl = (input as any).imageUrl;
    this.icon = (input as any).icon;
    this.backgroundColor = (input as any).backgroundColor;
    this.foregroundColor = (input as any).foregroundColor;
    this.borderColor = (input as any).borderColor;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      imageUrl: this.imageUrl,
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
