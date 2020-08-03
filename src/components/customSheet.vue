<template>
  <div class="soa-custom-sheet">
    <van-field
      v-model="value"
      :readonly="true"
      :label="label"
      right-icon="arrow"
      @click="show = true"
    />
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="handleSelect" />
  </div>
</template>

<script>
export default {
  name: 'CustomSheet',
  props: {
    label: {
      type: String,
      default: ''
    },
    actions: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    handleSelect(item) {
      this.show = false;
      this.$emit('input', item.name)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/var.scss";
@import "@/assets/mixins/mixins.scss";

@include b(custom-sheet) {
}
</style>
