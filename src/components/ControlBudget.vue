<template>
  <v-container class="bg-white w-75 rounded-xl elevation-14 pa-8">
    <v-row class="budgetcontrol-container">
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <div class="percentage-container">
          <p
            class="percentage text-h3 font-weight-black"
            :style="{ color: colorCircle }"
          >
            {{ percentage }}%
          </p>
          <CircleProgress :fill-color="colorCircle" :percent="percentage" />
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column align-center justify-center"
      >
        <div class="my-8 text-left text-h6 text-md-h5 w-100">
          <p class="text-grey-darken-1 mt-1">
            <span class="font-weight-bold" :style="{ color: colorCircle }"
              >Budget:</span
            >
            {{ formatMoney(budget) }}
          </p>
          <p class="text-grey-darken-1 mt-1">
            <span class="font-weight-bold" :style="{ color: colorCircle }"
              >Available:</span
            >
            {{ formatMoney(available) }}
          </p>
          <p class="text-grey-darken-1 mt-1">
            <span class="font-weight-bold" :style="{ color: colorCircle }"
              >Spent:</span
            >
            {{ formatMoney(spent) }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { formatMoney } from "../helpers";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
const props = defineProps({
  budget: {
    require: true,
  },
  available: {
    require: true,
  },
  spent: {
    require: true,
  },
  colorCircle: {
    require: true,
    type: String,
  },
});
const emit = defineEmits(["reset-budget"]);

const percentage = computed(() => {
  return parseInt((100 * props.spent) / props.budget);
});
</script>

<style scoped>
.percentage-container {
  position: relative;
}
.percentage {
  position: absolute;
  margin: auto;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
