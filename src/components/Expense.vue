<template>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__backInRight"
    leave-active-class="animate__animated animate__backOutRight"
  >
    <v-btn
      class="rounded-xl text-left pa-5 pa-md-10 mt-5 elevation-7 h-100 w-100 d-block text-capitalize position-relative"
      @click="emit('show-expense', exp.id)"
      v-if="exp.active"
    >
      <p
        class="text-uppercase text-white font-weight-regular text-h9 rounded-t-xl pa-2 text-h6 category-container w-100"
        :style="{ backgroundColor: getCategoryColor(exp.expenseCategory) }"
      >
        {{ exp.expenseCategory }}
      </p>
      <v-row class="mt-5">
        <v-col cols="12" class="d-flex align-center"> </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <h1>{{ exp.expenseName }}</h1>
          <p class="font-weight-bold">
            Date:
            <span class="font-weight-medium">{{ formatFecha(exp.date) }}</span>
          </p>
        </v-col>
        <v-col cols="12" md="6"
          ><p class="text-h5 text-right font-weight-bold text-red-accent-3">
            {{ formatMoney(exp.expenseAmount) }}
          </p>
        </v-col>
      </v-row>
    </v-btn>
  </Transition>
</template>

<script setup>
import { formatMoney, formatFecha } from "../helpers";
const props = defineProps({
  exp: {
    require: true,
  },
  categories: {
    require: true,
  },
});

const emit = defineEmits(["show-expense"]);

const getCategoryColor = (category) => {
  const foundCategory = props.categories.find((c) => c.value === category);
  return foundCategory ? foundCategory.color : "#000000"; // Default color if not found
};
</script>

<style scoped>
.button-container {
  position: absolute;
  bottom: 0px;
  right: 10px;
}
.category-container {
  position: absolute;
  top: 0;
}
</style>
