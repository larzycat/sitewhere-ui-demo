<template>
    <v-container style="padding: 10px;">
        <v-layout class="shadow" @click="onObjViewBanner">
            <v-flex xs7 >
                <edgecomputingimage />
            </v-flex>
            <v-flex xs5 class="pr-3">
                <v-layout column   fill-height class="assn-asset-image">
                    <v-card class="assn-asset-title">
                        物可视
                    </v-card>
                    <v-divider></v-divider>
                    <v-card style="height: 148px;">
                        <v-card-text class="assn-asset-label">模型种类：<span  class="assn-asset-value">100个</span></v-card-text>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component} from "sitewhere-ide-common";
    import { IStyle } from "../common/Style";
    import edgecomputingimage from "./EdgeComputingImage.vue";
    @Component({
        components: {
            edgecomputingimage
        }
    })
    export default class ObjectModelBanner extends Vue {

        get logoStyle(): IStyle {
            return {
                height: "120px",
                width: "120px",
                "padding-left": "15px"
            };
        }

        onObjViewBanner() {
            this.$emit("openObjView");
        }

    }
</script>
<style scoped>

    .assn-asset-image {
        position: relative;
        top: 10px;
        left: 8px;
        height: 200px;
        border: 1px solid #eee;
    }
    .assn-asset-title {
        text-align: center;
        line-height: 50px;
        background-color: #F5F5F5;
        font-size: 16px;
        color: #333;
        font-weight: 700;
        white-space: nowrap;
    }
    .assn-asset-label {
        position: relative;
        font-size: 14px;
        color: #333;
        white-space: nowrap;
    }
    .assn-asset-value {
        font-size: 14px;
        color: #333;
        font-weight: 700;
        white-space: nowrap;
    }
    .shadow{
        border: 1px solid #eee;
        line-height: 100px;
        height: 230px;
        background: #F5F5F5;
        transition-duration: 0.5s;
    }
    .shadow:hover{
        -webkit-box-shadow: #ccc 10px 10px 10px;
        -moz-box-shadow: #ccc 10px 10px 10px;
        box-shadow: #ccc 10px 10px 10px;
    }
</style>
