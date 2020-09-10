<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Name"
        title="Name displayed for remote."
        v-model="name"
        icon="info"
      >
        <span v-if="!$v.name.required && $v.$dirty">请输入名称</span>
      </form-text>
    </v-flex>
    <v-flex xs2>
      <form-select
        :items="protocols"
        title="选择连接协议"
        label="协议"
        item-text="text"
        item-value="value"
        v-model="protocol"
        icon="router"
      />
    </v-flex>
    <v-flex xs6>
      <form-text required class="ml-3" label="Hostname" title="Hostname for remote." v-model="host">
        <span v-if="!$v.host.required && $v.$dirty">请输入主机名</span>
      </form-text>
    </v-flex>
    <v-flex xs3>
      <form-text
        required
        class="ml-3"
        type="number"
        label="端口"
        title="远程端口"
        v-model="port"
      >
        <span v-if="!$v.port.required && $v.$dirty">请输入位置</span>
      </form-text>
    </v-flex>
    <v-flex xs1>
      <v-btn class="mb-0" color="primary" icon @click="onCreateClicked">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";
import FormSelect from "../common/form/FormSelect.vue";
import { generateUniqueId } from "../common/Utils";

import { required } from "vuelidate/lib/validators";
import { IRemoteConnection } from "../common/ApplicationModel";

@Component({
  components: {
    DialogForm,
    FormText,
    FormSelect
  },
  validations: {
    name: {
      required
    },
    protocol: {
      required
    },
    host: {
      required
    },
    port: {
      required
    }
  }
})
export default class RemoteConnectionDetails extends DialogSection {
  name: string | null = null;
  protocol: string | null = null;
  host: string | null = null;
  port: number | null = null;
  protocols: { text: string; value: string }[] = [
    {
      text: "http",
      value: "http"
    },
    {
      text: "https",
      value: "https"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.name = null;
    this.protocol = null;
    this.host = null;
    this.port = null;
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
    this.protocol = (input as any).protocol;
    this.host = (input as any).areaType.host;
    this.port = (input as any).port;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      id: generateUniqueId(),
      name: this.name,
      protocol: this.protocol,
      host: this.host,
      port: this.port
    };
  }

  /** Called when create button is clicked */
  onCreateClicked() {
    let added: IRemoteConnection = this.save() as IRemoteConnection;
    this.$emit("added", added);
    this.reset();
  }
}
</script>
