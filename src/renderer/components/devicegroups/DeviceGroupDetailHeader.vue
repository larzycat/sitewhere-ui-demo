<template>
  <sw-navigation-header-panel v-if="deviceGroup" height="200px">
    <template slot="left">
      <sw-header-branding-panel :entity="deviceGroup" />
    </template>
    <template slot="content">
      <sw-navigation-header-fields>
        <sw-header-field label="Token">
          <clipboard-copy-field :field="deviceGroup.token" message="Token copied to clipboard" />
        </sw-header-field>
        <sw-header-field label="名称">
          <span>{{ deviceGroup.name }}</span>
        </sw-header-field>
        <sw-header-field label="说明">
          <span>{{ deviceGroup.description }}</span>
        </sw-header-field>
        <sw-header-field label="图像 URL">
          <span>{{ deviceGroup.imageUrl }}</span>
        </sw-header-field>
        <sw-header-field label="角色">
          <span>{{ rolesList }}</span>
        </sw-header-field>
      </sw-navigation-header-fields>
    </template>
    <template slot="right">
      <authenticated-image :url="qrCodeUrl" />
    </template>
  </sw-navigation-header-panel>
</template>

<script lang="ts">
import { Component, HeaderComponent } from "sitewhere-ide-common";
import { IDeviceGroup } from "sitewhere-rest-api";

import ClipboardCopyField from "../common/form/ClipboardCopyField.vue";
import AuthenticatedImage from "../common/AuthenticatedImage.vue";

@Component({
  components: {
    ClipboardCopyField,
    AuthenticatedImage
  }
})
export default class DeviceGroupDetailHeader extends HeaderComponent<
  IDeviceGroup
> {
  // Reference record as device group.
  get deviceGroup(): IDeviceGroup {
    return this.record;
  }

  // Get token.
  get token(): string {
    return this.deviceGroup ? this.deviceGroup.token : "";
  }

  // Get URL for QR code.
  get qrCodeUrl(): string {
    return this.deviceGroup
      ? "devicegroups/" + this.token + "/label/qrcode"
      : "";
  }

  // Get list of roles for group.
  get rolesList(): string {
    return this.deviceGroup ? this.deviceGroup.roles.join(", ") : "";
  }
}
</script>
