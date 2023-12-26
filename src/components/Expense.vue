<template>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__backInRight"
    leave-active-class="animate__animated animate__backOutRight"
  >
    <v-card class="rounded-lg text-left pa-5 mt-5 elevation-7">
      <v-row>
        <v-col cols="12" md="6">
          <h1>{{ exp.expenseName }}</h1>
          <p class="font-weight-bold">
            Date:
            <span class="font-weight-medium">{{ formatFecha(exp.date) }}</span>
          </p>
        </v-col>
        <v-col cols="12" md="6"
          ><p class="text-h5 text-right font-weight-bold text-red-accent-3">
            {{ formatMoney(exp.expenseAmount) }}
          </p></v-col
        >
      </v-row>
    </v-card>
  </Transition>
</template>

<script setup>
import { formatMoney, formatFecha } from "../helpers";
const props = defineProps({
  exp: {
    require: true,
  },
});
</script>

<style scoped></style>
