<template>
    <v-card   class="assn-asset-image">
        <v-img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597895327771&di=f0a78e40bd4cfa897225305527064d17&imgtype=0&src=http%3A%2F%2Fwww.vcom-edu.com%2Fuploads%2Fallimg%2F140120%2F2-1401201F453918.jpg"
               gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
               height="200px"
        ></v-img>
    </v-card>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "sitewhere-ide-common";

    @Component({})
    export default class EdgeComputingImage extends Vue {

        @Prop({ default: "5x" }) readonly iconSize!: string;

    }
</script>

<style scoped>
    .icon-style {
        width: 100%;
        height: 100%;
    }

     .div-border {
         border: 1px solid #eee;
         line-height: 100px;
         height: 230px;
         padding-top: 3px;
     }
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
</style>

