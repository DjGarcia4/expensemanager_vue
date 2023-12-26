<template>
  <div class="budget-container">
    <v-container class="bg-white w-75 rounded-xl elevation-14 pa-12">
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
          <v-btn
            block
            class="mt-2 bg-orange-accent-3 text-white font-weight-bold text-h5 text-capitalize"
            height="40"
            @click="$emit('reset-budget')"
            >Reset Budget</v-btn
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
              {{ formatMoney(available) }}
            </p>
            <p class="text-grey-darken-1 mt-3">
              <span class="font-weight-bold text-orange-accent-3">Spent:</span>
              {{ formatMoney(0) }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
});
const emit = defineEmits(["reset-budget"]);
</script>

<style scoped></style>
