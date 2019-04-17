<template>
  <v-card
    class="bent-card"
    color="white"
    min-width="300px"
    max-width="400px">
    <v-layout
      column
      justify-center
      fill-height>
      <v-layout
        fill-height
        class="mb-1 pa-3">
        <v-flex xs5>
          <v-layout
            justify-center
            align-center
            fill-height>
            <v-icon
              :color="value.color"
              size="72px"
              class="text-xs-center">{{ value.icon }}</v-icon>
          </v-layout>
        </v-flex>
        <v-spacer/>
        <v-flex
          xs6
          class="text-xs-right">
          <h1 :class="smaller? `${value.color}--text`: 'black--text'">{{ value.header }}</h1>
          <h5>{{ value.subheader }}</h5>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="!smaller"
        align-center
        fill-height
        class="top-border pa-2">
        <v-icon class="mx-2">refresh</v-icon> Updated now
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    smaller: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway');
.top-border {
  border-top: 1px solid #eee;
}
.bent-card {
  font-family: 'Raleway', sans-serif;
  border-radius: 10px;
}
</style>
