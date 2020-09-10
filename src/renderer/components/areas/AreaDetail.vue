<template>
  <sw-detail-page
    :icon="icon"
    :title="title"
    loadingMessage="正在加载站点..."
    :loaded="loaded"
    :record="area"
  >
    <template slot="header">
      <area-detail-header :record="area" />
    </template>
    <template slot="tabs">
      <v-tab key="areas">子站点</v-tab>
      <v-tab key="assignments">分配的设备</v-tab>
      <v-tab key="locations">位置</v-tab>
      <v-tab key="measurements">测量</v-tab>
      <v-tab key="alerts">警报</v-tab>
      <v-tab key="zones">站点</v-tab>
    </template>
    <template slot="tab-items">
      <area-subareas tabkey="areas" ref="subareas" :areaToken="token" />
      <area-assignments tabkey="assignments" :areaToken="token" />
      <area-location-events tabkey="locations" :areaToken="token" />
      <area-measurement-events tabkey="measurements" :areaToken="token" />
      <area-alert-events tabkey="alerts" :areaToken="token" />
      <area-zones ref="zones" tabkey="zones" :area="area" />
    </template>
    <template slot="dialogs">
      <area-create-dialog ref="create" :parentArea="area" @created="onSubareaAdded" />
      <area-update-dialog
        ref="edit"
        :token="token"
        :parentArea="area"
        @areaUpdated="onAreaUpdated"
      />
      <area-delete-dialog ref="delete" :token="token" @deleted="afterAreaDeleted" />
      <zone-create-dialog ref="zoneCreate" :area="area" @zoneAdded="onZoneAdded" />
    </template>
    <template slot="actions">
      <up-button v-if="parentArea" tooltip="上一层" @action="onUpOneLevel" />
      <area-button tooltip="添加子站点" @action="onAddSubarea" />
      <zone-button tooltip="添加站点" @action="onAddZone" />
      <edit-button tooltip="编辑站点" @action="onEdit" />
      <delete-button tooltip="删除站点" @action="onDelete" />
    </template>
  </sw-detail-page>
</template>

<script lang="ts">
import {
  Component,
  DetailComponent,
  INavigationSection,
  Refs
} from "sitewhere-ide-common";

import AreaDetailHeader from "./AreaDetailHeader.vue";
import AreaSubareas from "./AreaSubareas.vue";
import AreaAssignments from "./AreaAssignments.vue";
import AreaLocationEvents from "./AreaLocationEvents.vue";
import AreaMeasurementEvents from "./AreaMeasurementEvents.vue";
import AreaAlertEvents from "./AreaAlertEvents.vue";
import AreaZones from "./AreaZones.vue";
import AreaCreateDialog from "./AreaCreateDialog.vue";
import AreaUpdateDialog from "./AreaUpdateDialog.vue";
import AreaDeleteDialog from "./AreaDeleteDialog.vue";
import ZoneCreateDialog from "./ZoneCreateDialog.vue";
import UpButton from "../common/navbuttons/UpButton.vue";
import AreaButton from "../common/navbuttons/AreaButton.vue";
import ZoneButton from "../common/navbuttons/ZoneButton.vue";
import EditButton from "../common/navbuttons/EditButton.vue";
import DeleteButton from "../common/navbuttons/DeleteButton.vue";

import { Route } from "vue-router";
import { routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { NavigationIcon } from "../../libraries/constants";
import { getArea } from "../../rest/sitewhere-areas-api";
import { IArea, IAreaResponseFormat } from "sitewhere-rest-api";

@Component({
  components: {
    AreaDetailHeader,
    AreaSubareas,
    AreaAssignments,
    AreaLocationEvents,
    AreaMeasurementEvents,
    AreaAlertEvents,
    AreaZones,
    AreaCreateDialog,
    AreaUpdateDialog,
    AreaDeleteDialog,
    ZoneCreateDialog,
    UpButton,
    AreaButton,
    ZoneButton,
    EditButton,
    DeleteButton
  }
})
export default class AreaDetail extends DetailComponent<IArea> {
  parentArea: IArea | null = null;

  // References.
  $refs!: Refs<{
    create: AreaCreateDialog;
    edit: AreaUpdateDialog;
    delete: AreaDeleteDialog;
    subareas: AreaSubareas;
    zoneCreate: ZoneCreateDialog;
    zones: AreaZones;
  }>;

  /** Record as area */
  get area(): IArea | null {
    return this.record;
  }

  /** Icon for page */
  get icon(): NavigationIcon {
    return NavigationIcon.Area;
  }

  /** Get page title */
  get title(): string {
    return this.area ? this.area.name : "";
  }

  /** Called when component is reused */
  beforeRouteUpdate(to: Route, from: Route, next: any) {
    this.display(to.params.token);
    next();
  }

  /** Load record */
  loadRecord(token: string): AxiosPromise<IArea> {
    let format: IAreaResponseFormat = {
      includeAreaType: true
    };
    return getArea(this.$store, token, format);
  }

  // Called after data is loaded.
  afterRecordLoaded(area: IArea) {
    this.parentArea = (area as any).parentArea;
    var section: INavigationSection = {
      id: "areas",
      title: "站点",
      icon: NavigationIcon.Area,
      route: "/admin/areas/" + area.token,
      longTitle: "管理站点: " + area.name
    };
    this.$store.commit("currentSection", section);
  }

  // Called to open area edit dialog.
  onEdit() {
    if (this.token) {
      this.$refs.edit.open(this.token);
    }
  }

  /** Called to add a subarea */
  onAddSubarea() {
    this.$refs.create.open();
  }

  /** Called after subarea added */
  onSubareaAdded() {
    this.$refs.subareas.refresh();
  }

  /** Called to add a zone */
  onAddZone() {
    this.$refs.zoneCreate.open();
  }

  /** Called after zone added */
  onZoneAdded() {
    this.$refs.zones.refresh();
    this.refresh();
  }

  /** Called when area is updated */
  onAreaUpdated() {
    this.refresh();
  }

  /** Called to open the delete dialog */
  onDelete() {
    if (this.token) {
      this.$refs.delete.open(this.token);
    }
  }

  /** Called when area is deleted */
  afterAreaDeleted() {
    routeTo(this, "/areas");
  }

  // Move up one level in the area hierarchy.
  onUpOneLevel() {
    if (this.parentArea) {
      routeTo(this, "/areas/" + this.parentArea.token);
    }
  }
}
</script>
