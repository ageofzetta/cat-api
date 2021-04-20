<template>
  <div class="navigation">
    <button
      @click.prevent="goPrevPage"
      :disabled="navigation.prevPage === null"
      data-testid="button-prev"
    >
      Prev
    </button>
    <button
      @click.prevent="goNextPage"
      data-testid="button-next"
      class="button-next"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Namespace from "@/namespaces";
import { CatState } from "@/store/types";
import { ActionMethod } from "vuex";

@Component({
  components: {},
})
export default class Navigation extends Vue {
  @Getter(Namespace.GET_NAVIGATION)
  public navigation!: CatState["navigation"];
  @Action(Namespace.ACTION_NEXT_PAGE)
  public goNextPage!: ActionMethod;
  @Action(Namespace.ACTION_PREV_PAGE)
  public goPrevPage!: ActionMethod;
}
</script>
