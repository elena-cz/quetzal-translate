<script>
export default {
  name: 'AdminPageSwitcher',

  props: {
    page: {
      type: String,
      default: 'phrases',
    },
  },
};
</script>

<template>
  <div>
    <v-btn
      v-if="page === 'phrases'"
      text
      color="white"
      @click="$router.push('/admin/topics')"
      >Topics</v-btn
    >
    <v-btn v-else text color="white" @click="$router.push('/admin/phrases')"
      >Phrases</v-btn
    >
  </div>
</template>
