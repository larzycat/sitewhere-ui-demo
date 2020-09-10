<template>
  <div>
    <sw-confirm-dialog
      ref="dialog"
      buttonText="Update"
      title="更新分配状态"
      width="400"
      @confirmed="onExecuteAction"
    >
      <v-card-text>是否确定要更新分配状态？</v-card-text>
    </sw-confirm-dialog>
    <span v-if="assignment.status === 'Released'">发布</span>
    <v-menu offset-y v-else-if="assignment.status === 'Active'">
      <v-tooltip left slot="activator">
        <v-btn small class="green darken-2 white--text pa-0 ma-0" slot="activator">激活</v-btn>
        <span>更新状态</span>
      </v-tooltip>
      <v-list>
        <v-list-tile
          @click.stop="confirmFirst(item.action)"
          v-for="item in statusActiveItems"
          :key="item.text"
        >
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu offset-y v-else-if="assignment.status === 'Missing'">
      <v-tooltip left slot="activator">
        <v-btn small class="red darken-2 white--text pa-0 ma-0" slot="activator">未存在</v-btn>
        <span>更新状态</span>
      </v-tooltip>
      <v-list>
        <v-list-tile
          @click.stop="confirmFirst(item.action)"
          v-for="item in statusMissingItems"
          :key="item.text"
        >
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Refs } from "sitewhere-ide-common";
import Vue from "vue";

import { AxiosResponse } from "axios";
import { IDeviceAssignment } from "sitewhere-rest-api";

import {
  releaseAssignment,
  missingAssignment
} from "../../rest/sitewhere-device-assignments-api";

@Component({})
export default class AssignmentStatusButton extends Vue {
  @Prop() readonly assignment!: IDeviceAssignment;

  // References.
  $refs!: Refs<{
    dialog: any;
  }>;

  action: () => any = function() {};
  statusActiveItems: { text: string; action: () => any }[] = [
    {
      text: "释放分配",
      action: this.onReleaseAssignment
    },
    {
      text: "消失",
      action: this.onMissingAssignment
    }
  ];
  statusMissingItems: { text: string; action: () => any }[] = [
    {
      text: "释放分配",
      action: this.onReleaseAssignment
    }
  ];

  /** Store the action and open confirmation */
  confirmFirst(action: () => any) {
    this.action = action;
    this.$refs.dialog.open();
  }

  /** Executes action after confirmation */
  onExecuteAction() {
    this.action();
  }

  /** Called to mark an assignment as released */
  async onReleaseAssignment() {
    let response: AxiosResponse<IDeviceAssignment> = await releaseAssignment(
      this.$store,
      this.assignment.token
    );
    this.onStatusUpdated(response.data);
  }

  /** Called to mark an assignment as missing */
  async onMissingAssignment() {
    let response: AxiosResponse<IDeviceAssignment> = await missingAssignment(
      this.$store,
      this.assignment.token
    );
    this.onStatusUpdated(response.data);
  }

  /** Handle successful update */
  onStatusUpdated(result: any) {
    this.$emit("updated");
  }
}
</script>
