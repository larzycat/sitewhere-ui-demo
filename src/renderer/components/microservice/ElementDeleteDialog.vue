<template>
  <sw-delete-dialog
    v-if="record"
    ref="dialog"
    title="删除配置元素"
    width="400"
    :visible="visible"
    @delete="onDelete"
    @cancel="onCancel"
  >
    <v-card-text v-if="!record.optional" class="pb-0 mb-0">
      <v-icon class="red--text text--darken-3 mr-1 mb-1">warning</v-icon>
      <span class="title text--darken-5">正在删除必需的元素！</span>
    </v-card-text>
    <v-card-text>{{ message }}</v-card-text>
  </sw-delete-dialog>
</template>

<script lang="ts">
import { Component, Prop, DeleteDialogComponent } from "sitewhere-ide-common";

import {
  IConfiguredElement,
  IConfiguredContent,
  IContentElement
} from "./ConfigurationModel";

@Component({})
export default class ElementDeleteDialog extends DeleteDialogComponent<
  IContentElement
> {
  @Prop() readonly content!: IConfiguredContent;

  get message() {
    if (this.record) {
      if (!this.record.optional) {
        return (
          "是否确定要删除 '" +
          this.record.name +
          "'? 父组件需要它"
        );
      } else {
        return "是否确定要删除 '" + this.record.name + "'?";
      }
    }
    return "";
  }

  /** Load payload */
  prepareLoad(identifier: string): IContentElement {
    if (this.content.elements) {
      this.content.elements.forEach(element => {
        if (identifier == element.id) {
          this.record = element;
        }
      });
    }
    if (this.record) {
      return this.record;
    }
    throw new Error("Element not found.");
  }

  /** Called after record is loaded */
  afterLoad(element: IConfiguredElement): void {}

  /** Load payload */
  prepareDelete(element: IConfiguredElement): IContentElement {
    if (this.record != null) {
      return this.record;
    }
    throw new Error("Record was null.");
  }

  // Called after create button is clicked.
  onDelete(e: any) {
    this.delete();
  }

  // Called after cancel button is clicked.
  onCancel(e: any) {
    this.cancel();
  }
}
</script>
