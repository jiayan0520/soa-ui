<template>
  <div class="soa-custom-sheet">
    <van-field
      v-model="selectValue"
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
      show: false,
      selectValue: this.actions[0].name
    }
  },
  watch: {
    value: {
      handler: function(val, oldval) {
        const selectItem = this.actions.filter((item) => {
          return val === item.id;
        })
        selectItem.length && (this.selectValue = selectItem[0].name);
      },
      immediate: true
    }
  },
  methods: {
    handleSelect(item) {
      this.show = false;
      this.selectValue = item.name
      this.$emit('input', item.id)
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
