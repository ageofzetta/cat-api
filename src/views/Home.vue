<template>
  <div class="home">
    <Navigation />
    <CatTable :cats="catImages" />
    <Navigation />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import * as Namespace from "@/namespaces";
import { CatImage } from "@/store/types";
import CatTable from "@/components/CatTable.vue";
import Navigation from "@/components/Navigation.vue";
@Component({
  components: {
    CatTable,
    Navigation,
  },
})
export default class Home extends Vue {
  @Getter(Namespace.GET_VISIBLE_CAT_IMAGE)
  public catImages!: CatImage[];
}
</script>
