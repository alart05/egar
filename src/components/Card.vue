<template>
  <v-card class="card">
    <v-card-text class="card__content">
      <div>
        <div class="text-h6">{{user.surname}}</div>
        <div class="text-h6">{{user.name}}</div>
        <div class="text-h6">{{user.patronymic}}</div>
      </div>
      <div class="icon">
        <v-icon size="80px">{{mdiAccount}}</v-icon>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAccount  } from '@mdi/js'

export default {
  name: 'Card',
  props: {
    user: { type: Object }
  },
  data() {
    return {
      mdiAccount: mdiAccount,
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.card{
  height: 100%;
}
.card__content{
  display: grid;
  grid-template-columns: 1fr 1fr;
  cursor: pointer;
  align-items: center;
  height: 100%;
}
.icon{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>