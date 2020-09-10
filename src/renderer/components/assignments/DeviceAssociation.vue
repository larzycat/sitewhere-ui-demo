<template>
  <sw-list-entry>
    <v-container>
      <v-layout>
        <v-flex>
          <div class="live">
            <span>脉冲数 :12312321</span>
            <span>正向运行 :12312321</span>
            <span>反向运行 :12312321</span>
            <span>室内温度 :12312321</span>
            <span>设备运行 :12312321</span>
            <span>设备温度 :12312321</span>
            <span>设备压力 :12312321</span>
            <span>设备流量 :12312321</span>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </sw-list-entry>
</template>

<script>
export default {};
</script>

<style scoped>
span {
  /* display: flex; */
  font-weight: 600;
  font-size: 16px;
  display: blocks;
  margin-left: 5%;
  /* text-align: justify; */
  /* text-align-last: justify; */
}
/* span:first-child {
  margin-left: -23px;
} */
</style>