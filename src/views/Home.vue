<template>
  <div class="home">
    <button
      @click.prevent="goPrevPage"
      :disabled="navigation.prevPage === null"
    >
      Prev
    </button>
    <button @click.prevent="goNextPage">Next</button>
    <CatTable :cats="catImages" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Namespace from "@/namespaces";
import { CatImage, CatState } from "@/store/types";
import CatTable from "@/components/CatTable.vue";
import { ActionMethod } from "vuex";

@Component({
  components: {
    CatTable,
  },
})
export default class Home extends Vue {
  @Getter(Namespace.GET_CAT_IMAGES)
  public catImages!: CatImage[];
  @Getter(Namespace.GET_NAVIGATION)
  public navigation!: CatState["navigation"];
  @Action(Namespace.ACTION_NEXT_PAGE)
  public goNextPage!: ActionMethod;
  @Action(Namespace.ACTION_PREV_PAGE)
  public goPrevPage!: ActionMethod;
}
</script>
