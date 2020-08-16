export default {
  prop: {
    backParms: {
      type: Object,
      default: () => { }
    }
  },
  mounted() {

  },
  destroyed() {
    // window.removeEventListener('popstate', this.goBack, false);
  }
}
