<template>
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__backInRight"
    leave-active-class="animate__animated animate__backOutRight"
  >
    <v-btn
      class="rounded-lg text-left pa-5 pa-md-10 mt-5 elevation-7 h-100 w-100 d-block text-capitalize"
      @click="emit('show-expense', exp.id)"
    >
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <p
            class="text-uppercase text-grey-darken-3 font-weight-regular text-h9"
          >
            {{ exp.expenseCategory }}
          </p>
        </v-col>
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
        <!-- <v-col cols="12" class="d-flex justify-end button-container">
          <v-btn class="bg-transparent elevation-0 pa-2 h-100">
            <lord-icon
              src="https://cdn.lordicon.com/drxwpfop.json"
              trigger="click"
              stroke="bold"
              colors="primary:#ff1744,secondary:#ff1744"
              style="width: 30px; height: 30px"
            >
            </lord-icon
          ></v-btn>
          <v-btn class="bg-transparent elevation-0 pa-2 h-100">
            <lord-icon
              src="https://cdn.lordicon.com/wuvorxbv.json"
              trigger="click"
              colors="primary:#e88c30,secondary:#e88c30"
              style="width: 30px; height: 30px"
            >
            </lord-icon
          ></v-btn>
        </v-col> -->
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
});

const emit = defineEmits(["show-expense"]);
</script>

<style scoped>
.button-container {
  position: absolute;
  bottom: 0px;
  right: 10px;
}
</style>
