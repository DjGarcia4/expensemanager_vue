<script setup>
import { ref, reactive } from "vue";
import Budget from "./components/Budget.vue";
import ControlBudget from "./components/ControlBudget.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

defineElement(lottie.loadAnimation);
const budget = ref("");
const available = ref(0);
const budgetDefined = ref(false);
const modal = ref(false);
const snackbar = reactive({
  show: false,
  text: "",
});
const spent = reactive({
  spentName: "",
  spentAmount: "",
  spentCategory: "",
  id: null,
  date: Date.now(),
});
const spents = ref([]);

const categories = [
  { value: "", label: "-- Select --" },
  { value: "savings", label: "Savings" },
  { value: "food", label: "Food" },
  { value: "home", label: "Home" },
  { value: "expenses", label: "Various Expenses" },
  { value: "leisure", label: "Leisure" },
  { value: "health", label: "Health" },
  { value: "subscriptions", label: "Subscriptions" },
];

const defineBudget = () => {
  budgetDefined.value = true;
  available.value = budget.value;
};

const resetBudget = () => {
  budget.value = 0;
  budgetDefined.value = false;
};

const addSpent = () => {
  modal.value = !modal.value;
};
const handleSpent = () => {
  if (Object.values(spent).includes("")) {
    snackbar.show = true;
    snackbar.text = "Please fill all fields.";
    setTimeout(() => {
      snackbar.show = false;
    }, 3000);
    return;
  }
  spents.value.push(spent);
  resetSpent();
  modal.value = false;
  $toast.success("Spent added succcessfully! ", {
    position: "top",
  });
};

const resetSpent = () => {
  Object.assign(spent, { spentName: "", spentAmount: "", spentCategory: "" });
};
</script>

<template>
  <div
    class="bg-grey-darken-3 text-center pa-10 header-container d-flex flex-column align-center"
  >
    <h1 class="text-h3 text-md-h2 font-weight-bold">
      Expense <span class="text-orange-accent-3">Planner</span>
    </h1>
    <div>
      <v-dialog v-model="modal" activator="parent" width="auto">
        <v-snackbar v-model="snackbar.show" color="#FF1744" location="top">
          {{ snackbar.text }}
        </v-snackbar>
        <v-card class="rounded-xl pa-8" max-width="400">
          <h1 class="text-center">
            Add <span class="text-orange-accent-3">Expense</span>
          </h1>
          <div class="d-flex justify-center">
            <lord-icon
              src="https://cdn.lordicon.com/xoaqvsym.json"
              trigger="loop"
              delay="1000"
              colors="primary:#FF9100"
              style="width: 150px; height: 150px"
            >
            </lord-icon>
          </div>
          <v-row>
            <v-col cols="12">
              <form @submit.prevent="handleSpent">
                <v-row class="d-flex justify-center">
                  <v-col cols="12">
                    <div class="mt-3">
                      <label for="spentName" class="font-weight-bold text-h6"
                        >Spent Name</label
                      >
                      <input
                        v-model="spent.spentName"
                        id="spentName"
                        type="text"
                        placeholder="Example: Social Life"
                        min="0"
                        class="input-container w-100 font-weight-bold"
                      />
                    </div>
                    <div class="mt-3">
                      <label for="spentAmount" class="font-weight-bold text-h6"
                        >Amount</label
                      >
                      <input
                        v-model="spent.spentAmount"
                        id="spentAmount"
                        type="number"
                        placeholder="Example: 100"
                        min="0"
                        class="input-container w-100 font-weight-bold"
                      />
                    </div>
                    <div class="mt-3">
                      <label
                        for="spentCategorie"
                        class="font-weight-bold text-h6"
                        >Categories</label
                      >
                      <select
                        class="input-container font-weight-bold"
                        v-model="spent.spentCategory"
                      >
                        <option
                          v-for="category in categories"
                          :key="category.value"
                          :value="category.value"
                        >
                          {{ category.label }}
                        </option>
                      </select>
                    </div>
                  </v-col>
                  <v-col cols="6" md="6" class="pa-1">
                    <v-btn
                      block
                      class="bg-orange-accent-3 text-white font-weight-bold text-h6 text-capitalize"
                      height="40"
                      type="submit"
                      >Add Spent</v-btn
                    >
                  </v-col>
                  <v-col cols="6" md="6" class="pa-1">
                    <v-btn
                      block
                      class="bg-red-accent-3 text-white font-weight-bold text-h6 text-capitalize"
                      height="40"
                      @click="modal = false"
                      >Cancel</v-btn
                    >
                  </v-col>
                </v-row>
              </form>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>
    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__backInLeft"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <Budget
        v-if="!budgetDefined"
        v-model:budget="budget"
        @define-budget="defineBudget"
      />
    </Transition>
    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__backInRight"
      leave-active-class="animate__animated animate__backOutRight"
    >
      <ControlBudget
        v-if="budgetDefined"
        @reset-budget="resetBudget"
        :budget="budget"
        :available="available"
      />
    </Transition>
    <!-- <v-btn class="addSpent" text>
      </v-btn> -->
    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutDown"
    >
      <div v-if="budgetDefined" class="addSpent">
        <v-btn class="bg-transparent elevation-0 pa-2" @click="addSpent">
          <lord-icon
            src="https://cdn.lordicon.com/zrkkrrpl.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#848484,secondary:#e88c30"
            style="width: 50px; height: 50px"
          >
          </lord-icon>
        </v-btn>
      </div>
    </Transition>
  </div>
</template>

<style>
.budget-container {
  position: absolute;
  margin-top: 110px;
  width: 100%;
}
.header-container {
  height: min(25vh, 640px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.addSpent {
  position: fixed;
  z-index: 999;
  right: 50px;
  bottom: 50px;
}
.input-container {
  width: 100%;
  background-color: rgb(243, 243, 243);
  height: 60px;
  padding: 20px;
  border-radius: 5px;
}
</style>
