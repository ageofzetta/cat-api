<template>
  <div class="about">
    <img :src="selectedCat.url" v-if="selectedCat"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Namespace from "@/namespaces";
import { CatImage, CatState } from "@/store/types";

@Component({
  components: {},
})
export default class Home extends Vue {
  @Getter(Namespace.GET_SELECTED_CAT)
  public selectedCat!: CatImage;
}
</script>
<style lang="scss" scoped>
img {
  max-width: 800px;
}
</style>
