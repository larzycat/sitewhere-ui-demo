<template>
  <sw-list-page
    :icon="icon"
    title="用户类型"
    loadingMessage="正在加载用户类型..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <sw-list-layout>
      <v-flex xs6 v-for="(customerType) in matches" :key="customerType.token">
        <customer-type-list-entry :customerType="customerType" @open="onOpenCustomerType" />
      </v-flex>
    </sw-list-layout>
    <template slot="noresults">
      <no-results-panel>
        <div>尚未为此租户创建任何用户类型.</div>
        <div class="mt-2">
          Click
          <v-icon small class="pl-1 pr-2">{{addIcon}}</v-icon>在工具栏中添加用户类型。
        </div>
      </no-results-panel>
    </template>
    <template slot="dialogs">
      <customer-type-create-dialog ref="add" @customerTypeAdded="refresh" :customerTypes="matches" />
    </template>
    <template slot="actions">
      <add-button tooltip="添加用户类型" @action="onAddCustomerType" />
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import { Component, ListComponent, Refs } from "sitewhere-ide-common";

import CustomerTypeListEntry from "./CustomerTypeListEntry.vue";
import CustomerTypeCreateDialog from "./CustomerTypeCreateDialog.vue";
import AddButton from "../common/navbuttons/AddButton.vue";
import NoResultsPanel from "../common/NoResultsPanel.vue";

import { routeTo } from "../common/Utils";
import { NavigationIcon } from "../../libraries/constants";
import { AxiosPromise } from "axios";
import { listCustomerTypes } from "../../rest/sitewhere-customer-types-api";
import {
  ICustomerType,
  ICustomerTypeSearchCriteria,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    CustomerTypeListEntry,
    CustomerTypeCreateDialog,
    AddButton,
    NoResultsPanel
  }
})
export default class CustomerTypesList extends ListComponent<
  ICustomerType,
  ICustomerTypeSearchCriteria,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchResults
> {
  $refs!: Refs<{
    add: CustomerTypeCreateDialog;
  }>;

  addIcon: string = NavigationIcon.Add;

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.CustomerType;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): ICustomerTypeSearchCriteria {
    let criteria: ICustomerTypeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): ICustomerTypeResponseFormat {
    let format: ICustomerTypeResponseFormat = {};
    format.includeContainedCustomerTypes = true;
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: ICustomerTypeSearchCriteria,
    format: ICustomerTypeResponseFormat
  ): AxiosPromise<ICustomerTypeSearchResults> {
    return listCustomerTypes(this.$store, criteria, format);
  }

  // Called when a customer type is clicked.
  onOpenCustomerType(customerType: ICustomerType) {
    routeTo(this, "/customertypes/" + customerType.token);
  }

  // Called to open dialog.
  onAddCustomerType() {
    this.$refs.add.open();
  }
}
</script>
