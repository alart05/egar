<template>
  <div>
    <div class="button__add">
      <v-btn
        small
        color="#CAA885"
        @click="createUser()"
      >
        Добавить нового сотрудника
      </v-btn>
    </div>
    <v-row>
      <v-col 
        cols="12" sm="6" md="4"
        v-for="people in $store.state.users" :key="people.id"  
      >
        <Card @click.native="openModal = true; $store.dispatch('setUserOnModal', people)" :user="people"/>
      </v-col>
    </v-row>
    <ModalWindow :openModal="openModal" v-if="openModal" @close="openModal = false"/>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import axios from 'axios'
import ModalWindow from '@/components/ModalWindow.vue'
export default {
  name: 'MainPage',
  components: { 
    Card,
    ModalWindow
  },
  data() {
    return {
      openModal: false,
    }
  },
  methods: {
    createUser () {
      this.openModal = true; 
      this.$store.dispatch('setUserOnModal', {
        id: new Date().getTime(), // уникальный id от текущего времени
        name: "",
        address: "",
        surname: "",
        patronymic: "",
        dateOfBirth: null,
        department: "",
        aboutMe: "",
      })
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
    })
      .then((response) => {
        response.data.forEach(user => {
          const nameArr = user.name.split(' ') // разбиваем строку на массив по пробелу
          if (nameArr[2]) { // если есть отчество то сохраняем
            user.patronymic = nameArr[2]
          }
          if (nameArr[1]) { //  если есть фамилия то сохраняем
            user.surname = nameArr[1]
          }
          if (nameArr[0]) { //  если есть имя то сохраняем
            user.name = nameArr[0]
          }
          // склеиваем адрес
          user.address = user.address.city + ', ' + user.address.street + ', ' + user.address.suite 
        });
        // сохраняем всех
        this.$store.dispatch('setUsers', response.data)
      });
  }
}
</script>

<style scoped>
.button__add{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  margin-top: 20px;
}
</style>
