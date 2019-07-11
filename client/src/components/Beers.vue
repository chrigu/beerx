<template>
  <div class="beers">
    <h1>Your beers</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Beers from '@/components/Beers.vue'

export default {
    name: 'beers',
    components: {
        Beers
    },
}
</script>
