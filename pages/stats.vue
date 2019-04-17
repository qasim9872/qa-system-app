<template>
  <v-layout 
    fill-height
    column
    align-center
    justify-center
    class="ma-5">

    <h1>Statistics</h1>

    <v-layout
      class="contain"
      justify-space-around
      fill-height>
      <v-flex
        v-for="stat in statsCards"
        :key="stat.icon"
        class="ma-3"
        xs12
        sm6
        wrap>
        <stat-card 
          :value="stat" 
          smaller/>
      </v-flex>
    </v-layout>

    <v-card
      color="white"
      class="pa-4 bent-card">
      <v-layout
        class="contain my-4"
        column
        justify-center
        align-center
        fill-height>
        <h2> Questions timeline </h2>
        <v-flex xs12>
          <area-chart
            :data="timeline"
            width="900px"
            height="300px" />
        </v-flex>
      </v-layout>
    </v-card>

  </v-layout>
</template>

<script>
import statCard from '../components/stat-card.vue'

export default {
  transition: 'tweakOpacity',
  async asyncData({ store }) {
    const stats = await store.dispatch(`helper/getStats`)

    return { stats }
  },
  components: {
    statCard
  },
  computed: {
    timeline() {
      return this.stats.timeline // { '2017-05-13': 2, '2017-05-14': 5 }
    },
    statsCards() {
      return [
        {
          header: this.stats.total,
          subheader: 'Total',
          icon: 'list',
          color: 'blue'
        },
        {
          header: this.stats.successful,
          subheader: 'Successful',
          icon: 'done_all',
          color: '#5cb85c'
        },
        {
          header: this.stats.failed,
          subheader: 'Failed',
          icon: 'close',
          color: 'red'
        }
      ]
    }
  }
}
</script>
