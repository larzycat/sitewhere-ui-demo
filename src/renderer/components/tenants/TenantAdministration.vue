<template>
  <v-app v-if="tenant">
    <sw-in-app-system-bar style="-webkit-app-region: drag" />
    <v-navigation-drawer fixed :permanent="true" style="margin-top: 25px;" v-model="drawer" app>
      <v-toolbar color="#fff" class="elevation-1" style="height: 47px;" dense>
        <div class="tenant-logo" :style="tenantLogoStyle" />
        <v-spacer />
        <v-tooltip bottom>
          <v-btn class="ma-0" icon @click="onInstanceSettings" slot="activator">
            <v-icon class="grey--text text--darken-1">settings</v-icon>
          </v-btn>
          <span>实例设置</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn class="ma-0" icon @click="onLogOut" slot="activator">
            <v-icon class="grey--text text--darken-1">exit_to_app</v-icon>
          </v-btn>
          <span>退出</span>
        </v-tooltip>
      </v-toolbar>
      <sw-navigation :sections="sections" @sectionSelected="onSectionClicked" />
    </v-navigation-drawer>
    <v-content>
      <v-container class="pa-0" fluid fill-height>
        <v-layout>
          <v-flex fill-height>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <sw-in-app-footer>
      <copyright />
    </sw-in-app-footer>
    <notifications />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import { handleError } from "../common/Utils";
import { AxiosResponse } from "axios";
import { getJwt } from "../../rest/sitewhere-api-wrapper";
import { Component, IAction, INavigationSection } from "sitewhere-ide-common";

import Copyright from "../Copyright.vue";
import Notifications from "../common/Notifications.vue";
import { NavigationIcon } from "../../libraries/constants";

import { ITenant, ITenantResponseFormat } from "sitewhere-rest-api";
import { getTenant } from "../../rest/sitewhere-tenants-api";

@Component({
  components: {
    Copyright,
    Notifications
  }
})
export default class TenantAdministration extends Vue {
  tenant!: ITenant;
  tenantToken!: string;
  drawer: boolean = true;
  sections: INavigationSection[] = [
    {
      id: "deviceGroup",
      title: "设备管理",
      icon: NavigationIcon.Device,
      route: "devices",
      longTitle: "Manage Devices",
      subsections: [
        {
          id: "devicetypes",
          title: "设备类型",
          icon: NavigationIcon.DeviceType,
          route: "devicetypes",
          longTitle: "设备类型管理"
        },
        {
          id: "devices",
          title: "设备",
          icon: NavigationIcon.Device,
          route: "devices",
          longTitle: "Manage Devices"
        },
        {
          id: "assignments",
          title: "设备分配",
          icon: NavigationIcon.DeviceAssignment,
          route: "assignments",
          longTitle: "Manage Assignments"
        },
        {
          id: "groups",
          title: "设备组",
          icon: NavigationIcon.DeviceGroup,
          route: "groups",
          longTitle: "Manage Device Groups"
        }
      ]
    },
    {
      id: "customersGroup",
      title: "用户管理",
      icon: NavigationIcon.Customer,
      route: "customers",
      longTitle: "Manage Customers",
      subsections: [
        {
          id: "customertypes",
          title: "用户类型",
          icon: NavigationIcon.CustomerType,
          route: "customertypes",
          longTitle: "Manage Customer Types"
        },
        {
          id: "customers",
          title: "用户",
          icon: NavigationIcon.Customer,
          route: "customers",
          longTitle: "Manage Customers"
        }
      ]
    },
    {
      id: "areasGroup",
      title: "站点管理",
      icon: NavigationIcon.Area,
      route: "areas",
      longTitle: "Manage Areas",
      subsections: [
        {
          id: "areatypes",
          title: "站点类型",
          icon: NavigationIcon.AreaType,
          route: "areatypes",
          longTitle: "Manage Area Types"
        },
        {
          id: "areas",
          title: "站点",
          icon: NavigationIcon.Area,
          route: "areas",
          longTitle: "Manage Areas"
        }
      ]
    },
    {
      id: "assetGroup",
      title: "资产管理",
      icon: NavigationIcon.Asset,
      route: "assets",
      longTitle: "Manage Assets",
      subsections: [
        {
          id: "assettypes",
          title: "资产类型",
          icon: NavigationIcon.AssetType,
          route: "assettypes",
          longTitle: "Manage Asset Types"
        },
        {
          id: "assets",
          title: "资产",
          icon: NavigationIcon.Asset,
          route: "assets",
          longTitle: "Manage Assets"
        }
      ]
	},
	{
      id: "edgecomputing",
      title: "边缘计算",
      icon: NavigationIcon.Device,
      route: "edgeCompute",
      longTitle: "Multi Access Edge Computing",
      subsections: [
        {
          id: "objectModel",
          title: "物模型",
          icon: NavigationIcon.DeviceType,
          route: "objectModel",
          longTitle: "物模型管理"
        },
        {
          id: "objectCompute",
          title: "物计算",
          icon: NavigationIcon.Device,
          route: "objectCompute",
          longTitle: "物计算管理"
        },
        {
          id: "objectView",
          title: "物可视",
          icon: NavigationIcon.DeviceAssignment,
          route: "objectView",
          longTitle: "物可视管理"
        },
        {
          id: "objectApplication",
          title: "物应用",
          icon: NavigationIcon.DeviceGroup,
          route: "groups",
          longTitle: "物应用管理"
        }
      ]
    },
    {
      id: "batch",
      title: "批处理操作",
      icon: NavigationIcon.BatchOperation,
      route: "batch",
      longTitle: "Manage Batch Operations"
    },
    {
      id: "schedules",
      title: "工作计划",
      icon: NavigationIcon.Schedule,
      route: "schedules",
      longTitle: "Manage Schedules"
    }
  ];
  userActions: IAction[] = [
    {
      id: "sysadmin",
      title: "系统管理",
      icon: "cog"
    },
    {
      id: "logout",
      title: "退出",
      icon: "power-off"
    }
  ];

  created() {
    // Set up JWT auto-refresh.
    this.refreshJwt();

    // Verify that user is logged in.
    var user = this.$store.getters.user;
    if (!user) {
      this.onLogOut();
      return;
    }

    // Verify that a tenant token was specified in the route.
    var tenantToken = this.$route.params.tenantToken;
    if (!tenantToken) {
      this.onLogOut();
      return;
    }
    this.tenantToken = tenantToken;

    // Load tenant if tenant id changed or not already loaded.
    var tenant = this.$store.getters.selectedTenant;
    if (!tenant || tenant.token !== this.tenantToken) {
      this.loadTenant();
    } else {
      this.tenant = tenant;
      console.log(tenant);
      this.onSectionClicked(this.$data.sections[0]);
    }
  }

  /** Set tenant logo in style */
  get tenantLogoStyle(): {} {
    return {
      backgroundImage: this.tenant ? "url(" + this.tenant.imageUrl + ")" : ""
    };
  }

  /** Get logged in user */
  get user() {
    return this.$store.getters.user;
  }

  /** Get currently selected section */
  get section() {
    return this.$store.getters.currentSection;
  }

  /** Get user full name */
  get fullname() {
    var user = this.$store.getters.user;
    if (user) {
      var first = this.$store.getters.user.firstName;
      var last = this.$store.getters.user.lastName;
      if (last.length > 1) {
        return first + " " + last;
      } else {
        return first;
      }
    }
    return "Not Logged In";
  }

  // Get global loading indicator.
  get loading() {
    return this.$store.getters.loading;
  }

  // Get global error indicator.
  get error() {
    return this.$store.getters.error;
  }

  // Called when a section is clicked.
  onSectionClicked(section: INavigationSection) {
    this.$store.commit("currentSection", section);
    this.$router.push("/tenants/" + this.tenantToken + "/" + section.route);
  }

  // Called when user requests log out.
  onLogOut() {
    this.$store.commit("logOut");
    this.$router.push("/");
  }

  /** Load tenant based on tenant id */
  async loadTenant() {
    try {
      let format: ITenantResponseFormat = {};
      let response: AxiosResponse<ITenant> = await getTenant(
        this.$store,
        this.tenantToken,
        format
      );
      this.onTenantLoaded(response.data);
    } catch (err) {
      console.log(
        "Unable to load tenant " + this.tenantToken + ". Logging out!"
      );
      this.onLogOut();
    }
  }

  /** Called after tenant is loaded */
  onTenantLoaded(tenant: ITenant) {
    this.tenant = tenant;
    console.log(this.tenant);
    this.$store.commit("selectedTenant", tenant);

    // Select first section from list.
    this.onSectionClicked(this.$data.sections[0]);
  }

  /** Route to instance settings */
  onInstanceSettings() {
    this.$router.push("/system");
  }

  // Set up timer for reloading JWT.
  async refreshJwt() {
    var component = this;
    try {
      let response: AxiosResponse<any> = await getJwt(this.$store);
      console.log("Refreshed JWT.");
      var jwt = response.headers["x-sitewhere-jwt"];
      this.$store.commit("jwt", jwt);
      setTimeout(function() {
        component.refreshJwt();
      }, 1000 * 60 * 5);
    } catch (err) {
      handleError(err);
      console.log("Could not update JWT.");
      component.onLogOut();
    }
  }
}
</script>

<style scoped>
.current-user-block {
  position: absolute;
  bottom: 40px;
}
.tenant-logo {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
