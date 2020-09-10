<template>
  <sw-list-page
    :icon="icon"
    title="批处理操作"
    loadingMessage="加载批处理操作 ..."
    :loaded="loaded"
    :results="results"
    @pagingUpdated="onPagingUpdated"
  >
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="matches"
        :hide-actions="true"
        no-data-text="未找到批处理操作"
      >
        <template slot="items" slot-scope="props">
          <td width="15%" :title="props.item.operationType">{{ props.item.operationType }}</td>
          <td width="15%" :title="props.item.processingStatus">{{ props.item.processingStatus }}</td>
          <td
            width="20%"
            style="white-space: nowrap"
            :title="formatDate(props.item.createdDate)"
          >{{ formatDate(props.item.createdDate) }}</td>
          <td
            width="20%"
            style="white-space: nowrap"
            :title="formatDate(props.item.processingStartedDate)"
          >{{ formatDate(props.item.processingStartedDate) }}</td>
          <td
            width="20%"
            style="white-space: nowrap"
            :title="formatDate(props.item.processingEndedDate)"
          >{{ formatDate(props.item.processingEndedDate) }}</td>
          <td width="10%" title="View Batch Operation">
            <v-tooltip left>
              <v-icon
                slot="activator"
                @click.stop="openBatchOperation(props.item.token)"
              >navigate_next</v-icon>
              <span>批处理操作详细信息</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-flex>
    <template slot="noresults">
      <no-results-panel>
        <div>尚未为此租户创建批处理操作</div>
      </no-results-panel>
    </template>
  </sw-list-page>
</template>

<script lang="ts">
import {
  Component,
  ListComponent,
  IPageSizes,
  ITableHeaders
} from "sitewhere-ide-common";

import NoResultsPanel from "../common/NoResultsPanel.vue";

import { NavigationIcon } from "../../libraries/constants";
import { formatDate, routeTo } from "../common/Utils";
import { AxiosPromise } from "axios";
import { listBatchOperations } from "../../rest/sitewhere-batch-operations-api";
import {
  IBatchOperation,
  IBatchOperationSearchCriteria,
  IBatchOperationResponseFormat,
  IBatchOperationSearchResults
} from "sitewhere-rest-api";

@Component({
  components: {
    NoResultsPanel
  }
})
export default class BatchOperationsList extends ListComponent<
  IBatchOperation,
  IBatchOperationSearchCriteria,
  IBatchOperationResponseFormat,
  IBatchOperationSearchResults
> {
  addIcon: string = NavigationIcon.Add;

  headers: ITableHeaders = [
    {
      align: "left",
      sortable: false,
      text: "操作",
      value: "operation"
    },
    {
      align: "left",
      sortable: false,
      text: "状态",
      value: "status"
    },
    {
      align: "left",
      sortable: false,
      text: "创建",
      value: "created"
    },
    {
      align: "left",
      sortable: false,
      text: "开始处理",
      value: "started"
    },
    {
      align: "left",
      sortable: false,
      text: "处理完成",
      value: "finished"
    },
    {
      align: "left",
      sortable: false,
      text: "",
      value: "open"
    }
  ];
  pageSizes: IPageSizes = [
    {
      text: "25",
      value: 25
    },
    {
      text: "50",
      value: 50
    },
    {
      text: "100",
      value: 100
    }
  ];

  /** Get page icon */
  get icon(): NavigationIcon {
    return NavigationIcon.BatchOperation;
  }

  /** Build search criteria for list */
  buildSearchCriteria(): IBatchOperationSearchCriteria {
    let criteria: IBatchOperationSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list */
  buildResponseFormat(): IBatchOperationResponseFormat {
    let format: IBatchOperationResponseFormat = {};
    return format;
  }

  /** Perform search */
  performSearch(
    criteria: IBatchOperationSearchCriteria,
    format: IBatchOperationResponseFormat
  ): AxiosPromise<IBatchOperationSearchResults> {
    return listBatchOperations(this.$store, criteria, format);
  }

  // Open detail page for batch operation.
  openBatchOperation(token: string) {
    routeTo(this, "/batch/" + token);
  }

  // Format a date.
  formatDate(date: Date) {
    return formatDate(date);
  }
}
</script>
