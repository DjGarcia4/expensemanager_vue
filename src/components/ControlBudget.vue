<template>
  <v-container class="bg-white w-75 rounded-xl elevation-14 pa-8">
    <v-row class="budgetcontrol-container">
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <div>
          <v-img src="../../src/assets/img/grafico.jpg" width="200"></v-img>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-center justify-center"
      >
        <div class="my-8 text-left text-h6 text-md-h5 w-100">
          <p class="text-grey-darken-1 mt-3">
            <span class="font-weight-bold text-orange-accent-3">Budget:</span>
            {{ formatMoney(budget) }}
          </p>
          <p class="text-grey-darken-1 mt-3">
            <span class="font-weight-bold text-orange-accent-3"
              >Available:</span
            >
            {{ formatMoney(available - totalExpense) }}
          </p>
          <p class="text-grey-darken-1 mt-3">
            <span class="font-weight-bold text-orange-accent-3">Spent:</span>
            {{ formatMoney(totalExpense) }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { formatMoney } from "../helpers";
const props = defineProps({
  budget: {
    require: true,
  },
  available: {
    require: true,
  },
  totalExpense: {
    require: true,
  },
});
const emit = defineEmits(["reset-budget"]);
</script>

<style scoped></style>
