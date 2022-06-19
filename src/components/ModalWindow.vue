<template>
  <v-dialog
    v-model="openModal"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Данные сотрудника</span>
      </v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent
          v-model="valid"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Имя"
                  v-model="userInfo.name"
                  :rules="[v => !!v || 'Поле обязательно для заполнения']"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  required
                  v-model="userInfo.surname"
                  :rules="[v => !!v || 'Поле обязательно для заполнения']"
                  label="Фамилия"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Отчество"
                  v-model="userInfo.patronymic"
                  :rules="[v => !!v || 'Поле обязательно для заполнения']"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="userInfo.dateOfBirth"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="userInfo.dateOfBirth"
                    label="Дата рождения"
                    :prepend-icon="mdiCalendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="userInfo.dateOfBirth"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Закрыть
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(userInfo.dateOfBirth)"
                  >
                    Сохранить
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <v-text-field
                label="Адрес проживания"
                v-model="userInfo.address"
              ></v-text-field>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="4"
              md="2"
            >
              <v-select
                :items="items"
                v-model="userInfo.department"
                label="Отдел"
              ></v-select>
            </v-col>
            <v-col
              class="d-flex"
              cols="12"
            >
              <v-textarea
                label="О себе"
                v-model="userInfo.aboutMe"
              ></v-textarea>
            </v-col>
          </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="deleteUser()"
          >
            Удалить
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('close')"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!valid"
            @click="save()"
          >
            Сохранить
          </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCalendar  } from '@mdi/js'

export default {
  name: 'ModalWindow',
  props: {
    openModal: { type: Boolean }
  },
  data() {
    return {
      items: ['1', '2', '3', '4'],
      mdiCalendar : mdiCalendar,
      menu: false,
      valid: false,
      userInfo: {
        id: "",
        name: "",
        address: "",
        surname: "",
        patronymic: "",
        dateOfBirth: "",
        department: "",
        aboutMe: "",
      }
    }
  },
  mounted() {
    // достаем из vuex инфо о текущем пользователе
    this.userInfo = {...this.$store.state.userOnModal}
  },
  methods: {
    save() {
      // сохраняем всех пользователей кроме текущего
      const allUser = this.$store.state.users.filter(user => user.id !== this.userInfo.id)
      // добавляем в начало текущего пользователя
      allUser.unshift(this.userInfo)
      // сохраняем всех
      this.$store.dispatch('setUsers', allUser)
      this.$emit('close')
    },
    deleteUser() {
      // сохраняем всех пользователей кроме текущего
      const allUser = this.$store.state.users.filter(user => user.id !== this.userInfo.id)
      // сохраняем всех
      this.$store.dispatch('setUsers', allUser)
      this.$emit('close')
    }
  }
}
</script>