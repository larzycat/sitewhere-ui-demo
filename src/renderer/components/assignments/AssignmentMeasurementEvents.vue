<template>
  <sw-data-table-tab
    :tabkey="tabkey"
    :loaded="loaded"
    :headers="headers"
    :results="results"
    :pageSizes="pageSizes"
    @pagingUpdated="onPagingUpdated"
    loadingMessage="正在加载分配测量..."
  >
    <template slot="items" slot-scope="props">
      <!-- <p>{{props}}</p> -->
      <!-- 测量值 -->
      <td width="50%" :title="props.item.metadata" v-for="(value,key,index) in props.item.metadata" :key="index" style="display:inline-block">
        <p>{{ key }}:{{ value }}</p>
        <!-- <p>设备流量 : {{ props.item.metadata.F2 }}</p>
        <P>装置压力 : {{ props.item.metadata.F3 }}</P>
        <p>名称4 : {{ props.item.metadata.F4 }}</p>
        <p>名称N : {{ props.item.metadata.F5 }}</p> -->
      </td>
      <!-- 测量名称 -->
      <!-- <td width="35%" :title="props.item.value">{{ props.item.value }}</td> -->
      <!-- 开始日期 -->
      <td
        width="25%"
        style="white-space: nowrap"
        :title="formatDate(props.item.eventDate)"
      >{{ formatDate(props.item.eventDate) }}</td>
      <!-- 接收日期 -->
      <td
        width="25%"
        style="white-space: nowrap"
        :title="formatDate(props.item.receivedDate)"
      >{{ formatDate(props.item.receivedDate) }}</td>
    </template>
  </sw-data-table-tab>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  ListComponent,
  IPageSizes,
  ITableHeaders
} from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
import { formatDate } from "../common/Utils";
import {
  EventPageSizes,
  AssignmentMeasurementHeaders
} from "../../libraries/constants";
import { listMeasurementsForAssignment } from "../../rest/sitewhere-device-assignments-api";
import {
  IDeviceMeasurement,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api";

@Component({})
export default class AreaMeasurementEvents extends ListComponent<
  IDeviceMeasurement,
  IDateRangeSearchCriteria,
  IDeviceMeasurementResponseFormat,
  IDeviceMeasurementSearchResults
> {
  @Prop() readonly tabkey!: string;
  @Prop() readonly token!: string;

  pageSizes: IPageSizes = EventPageSizes;
  headers: ITableHeaders = AssignmentMeasurementHeaders;

  /** Build search criteria for list
   * 为列表生成搜索条件
   */
  buildSearchCriteria(): IDateRangeSearchCriteria {
    let criteria: IDateRangeSearchCriteria = {};
    return criteria;
  }

  /** Build response format for list
   * 生成列表的响应格式
   */
  buildResponseFormat(): IDeviceMeasurementResponseFormat {
    let format: IDeviceMeasurementResponseFormat = {};
    return format;
  }

  /** Perform search
   * 执行搜索
   */
  performSearch(
    criteria: IDateRangeSearchCriteria,
    format: IDeviceMeasurementResponseFormat
  ): AxiosPromise<IDeviceMeasurementSearchResults> {
    return listMeasurementsForAssignment(
      this.$store,
      this.token,
      criteria,
      format
    );
  }

  /** Make function available to template
   * 使函数可用于模板
   */
  formatDate(date: Date) {
    return formatDate(date);
  }
}

// function loop():string{

// }
</script>
