<template>
  <div class="cat-images">
    <router-link v-for="cat in cats" :key="cat.id" :to="`/cats/${cat.id}`">
      <div
        class="cat-container"
        :style="`background-image: url(${cat.url})`"
      ></div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { CatImage } from "@/store/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private cats!: CatImage;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cat-images {
  max-width: 700px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
.cat-container {
  min-width: 200px;
  height: 200px;
  margin: 10px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
