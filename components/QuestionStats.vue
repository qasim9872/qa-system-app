<template>
  <div class="pa-2">
    <v-chip label> {{ askedAt }}</v-chip>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  computed: {
    askedAt() {
      return this.question.createdAt
    }
  }
}
</script>
