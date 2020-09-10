<template>
  <sw-list-page
    :icon="icon"
    title="设备组"
    loadingMessage="Loading device groups ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs6 v-for="(group) in matches" :key="group.token">
        <device-group-list-entry
          :deviceGroup="group"
          class="mb-1"
          @deviceGroupOpened="onOpenGroup"
        />
      </v-flex>
    </sw-list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>尚未为此租户创建设备组</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{addIcon}}</v-icon>在工具栏中添加设备组
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <device-group-create-dialog ref="add" @deviceGroupAdded="refresh" />
    </template>
    <template slot="actions">
      <add-button tooltip="创建设备组" @action="onAddDeviceGroup" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import { Component, ListComponent, Refs } from "sitewhere-ide-common";

import DeviceGroupListEntry from "./DeviceGroupListEntry.vue";
import DeviceGroupCreateDialog from "./DeviceGroupCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { NavigationIcon } from "../../libraries/constants";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listDeviceGroups } from "../../rest/sitewhere-device-groups-api";
import {
  IDeviceGroup,
  IDeviceGroupSearchCriteria,
  IDeviceGroupResponseFormat,
  IDeviceGroupSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    DeviceGroupListEntry,
    DeviceGroupCreateDialog,
    AddButton,
    NoResultsPanel
  }
})
export default class DeviceGroupsList extends ListComponent<
  IDeviceGroup,
  IDeviceGroupSearchCriteria,
  IDeviceGroupResponseFormat,
  IDeviceGroupSearchResults
> {
  $refs!: Refs<{
    add: DeviceGroupCreateDialog;
  }>;

  addIcon: string = NavigationIcon.Add;

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.DeviceGroup;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IDeviceGroupSearchCriteria {
    let criteria: IDeviceGroupSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IDeviceGroupResponseFormat {
    let format: IDeviceGroupResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IDeviceGroupSearchCriteria,
    format: IDeviceGroupResponseFormat
  ): AxiosPromise<IDeviceGroupSearchResults> {
    return listDeviceGroups(this.$store, criteria, format);
  }

  // Called to open detail page for group.
  onOpenGroup(group: IDeviceGroup) {
    routeTo(this, "/groups/" + group.token);
  }

  // Called to open dialog.
  onAddDeviceGroup() {
    this.$refs.add.open();
  }
}
</script>

<style scoped>
</style>
