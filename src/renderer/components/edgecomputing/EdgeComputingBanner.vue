<template>
	<div style="background-color: #F5F5F5">
		<v-toolbar  class="v-toolbar__content" style="height: 48px;" dense>
			<v-icon class="v-icon material-icons theme--light" >devices_other</v-icon>
			<v-toolbar-title>边缘计算</v-toolbar-title>
			<v-spacer/>
			<!--<sw-navigation-action-button icon="plus" tooltip=""   />-->
		</v-toolbar>
		<section >
			<section style="margin: 15px 20px 0 10px;">
				<v-layout row wrap >
					<v-flex xs6 class="xs6-color">
						<objectmodelbanner  @openObjModel="onOpenObjModelBanner" />
					</v-flex>
					<v-flex xs6 class="xs6-color">
						<objectedgebanner   @openObjComputing="onOpenObjComputingBanner"/>
					</v-flex>
				</v-layout>
			</section>
			<section style="margin: 15px 20px 0 10px;">
				<v-layout row wrap >
					<v-flex xs6 class="xs6-color">
						<objectviewbanner   @openObjView="onOpenObjViewBanner"/>
					</v-flex>
					<v-flex xs6 class="xs6-color">
						<objectappbanner    @openObjApp="onOpenObjAppBanner"/>
					</v-flex>
				</v-layout>
			</section>
		</section>

	</div>
</template>

<script lang="ts">
import { Component} from "sitewhere-ide-common";
import Vue from "vue";
import objectmodelbanner from "./ObjectModelBanner.vue";
import objectedgebanner from "./ObjectEdgeBanner.vue";
import objectviewbanner from "./ObjectViewBanner.vue";
import objectappbanner from "./ObjectAppBanner.vue";
import { routeTo } from "../common/Utils";
//	import { IDeviceAssignment } from "sitewhere-rest-api";
@Component({
	components: {
		objectmodelbanner,
		objectedgebanner,
		objectviewbanner,
		objectappbanner
	}
})
export default class EdgeComputingBanner extends Vue {

	/** Create background image style */
	backgroundImageStyle(image: string) {
		return {
			"background-image": "url(" + image + ")",
			"background-size": "contain",
			"background-repeat": "no-repeat",
			"background-position": "50% 50%"
		};
	}

	onOpenObjModelBanner() {
		routeTo(this, "/objectModel");
	}

	onOpenObjComputingBanner() {
		routeTo(this, "/objectCompute");
	}
	onOpenObjViewBanner() {
		routeTo(this, "/objectView");
	}

	onOpenObjAppBanner() {
		//routeTo(this, "/objectView");
	}
}
</script>

<style scoped>
 .xs6-color{
	 background-color: #fbfbfb
 }
</style>
