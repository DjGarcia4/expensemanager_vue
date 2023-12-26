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
              <form @submit.prevent="handleExpense">
                <v-row class="d-flex justify-center">
                  <v-col cols="12">
                    <div class="mt-3">
                      <label for="expenseName" class="font-weight-bold text-h6"
                        >Expense Name</label
                      >
                      <input
                        v-model="expense.expenseName"
                        id="expenseName"
                        type="text"
                        placeholder="Example: Social Life"
                        min="0"
                        class="input-container w-100 font-weight-bold"
                      />
                    </div>
                    <div class="mt-3">
                      <label
                        for="expenseAmount"
                        class="font-weight-bold text-h6"
                        >Amount</label
                      >
                      <input
                        v-model="expense.expenseAmount"
                        id="expenseAmount"
                        type="number"
                        placeholder="Example: 100"
                        min="0"
                        class="input-container w-100 font-weight-bold"
                      />
                    </div>
                    <div class="mt-3">
                      <label
                        for="expenseCategorie"
                        class="font-weight-bold text-h6"
                        >Categories</label
                      >
                      <select
                        class="input-container font-weight-bold"
                        v-model="expense.expenseCategory"
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
                      >Add Expense</v-btn
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
    <div class="budget-container">
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
    </div>
    <div class="budget-container">
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
          :totalExpense="totalExpense"
        />
      </Transition>
      <Transition
        name="custom-classes"
        enter-active-class="animate__animated animate__backInUp"
        leave-active-class="animate__animated animate__backOutDown"
      >
        <div v-if="budgetDefined">
          <v-container class="pa-12">
            <h1 class="text-black text-left">Expenses</h1>

            <Transition
              name="custom-classes"
              enter-active-class="animate__animated animate__backInLeft"
              leave-active-class="animate__animated animate__backOutLeft"
            >
              <h1
                v-if="expenses.length <= 0"
                class="text-black text-h6 font-weight-medium"
              >
                There are not
                <span class="text-orange-accent-3">expenses</span> yet.
              </h1>
            </Transition>
            <Transition
              name="custom-classes"
              enter-active-class="animate__animated animate__backInRight"
              leave-active-class="animate__animated animate__backOutRight"
            >
              <div v-if="expenses.length > 0">
                <Expense v-for="exp in expenses" :exp="exp" />
              </div>
            </Transition>
          </v-container>
        </div>
      </Transition>
    </div>
    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutDown"
    >
      <div v-if="budgetDefined" class="addExpense">
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn class="bg-transparent elevation-0 pa-2" v-bind="props"
              ><lord-icon
                src="https://cdn.lordicon.com/jdalicnn.json"
                trigger="click"
                stroke="bold"
                colors="primary:#e88c30,secondary:#e88c30"
                style="width: 50px; height: 50px"
              >
              </lord-icon
            ></v-btn>
          </template>
          <v-list class="rounded-lg">
            <v-list-item>
              <v-btn
                @click="resetBudget"
                block
                class="font-weight-medium text-capitalize text-h6"
                >Change Budget</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn
                @click="resetExpenses"
                block
                class="font-weight-medium text-capitalize text-h6"
                >Delete Expenses</v-btn
              >
            </v-list-item>
            <v-list-item>
              <v-btn
                @click="resetApp"
                block
                class="font-weight-medium text-capitalize text-h6"
                >Reset App</v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn class="bg-transparent elevation-0 pa-2" v-bind="props"
              ><lord-icon
                src="https://cdn.lordicon.com/zrkkrrpl.json"
                trigger="click"
                stroke="bold"
                colors="primary:#e88c30,secondary:#e88c30"
                style="width: 50px; height: 50px"
              >
              </lord-icon
            ></v-btn>
          </template>
          <v-list class="rounded-lg">
            <v-list-item>
              <v-btn
                block
                class="font-weight-medium text-capitalize text-h6"
                @click="addExpense"
                >Add Expense</v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import Budget from "./components/Budget.vue";
import ControlBudget from "./components/ControlBudget.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Expense from "./components/Expense.vue";

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
const totalExpense = computed(() => {
  return expenses.value.reduce(
    (total, exp) => total + parseFloat(exp.expenseAmount),
    0
  );
});
const expense = reactive({
  expenseName: "",
  expenseAmount: "",
  expenseCategory: "",
  id: null,
  date: Date.now(),
});
const expenses = ref([]);

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
const resetExpenses = () => {
  expenses.value = [];
};
const resetApp = () => {
  budget.value = 0;
  budgetDefined.value = false;
  expenses.value = [];
};

const addExpense = () => {
  modal.value = !modal.value;
};
const handleExpense = () => {
  if (Object.values(expense).includes("")) {
    snackbar.show = true;
    snackbar.text = "Please fill all fields.";
    setTimeout(() => {
      snackbar.show = false;
    }, 3000);
    return;
  }
  expenses.value.push({ ...expense });
  modal.value = false;
  $toast.success("Expense added succcessfully! ", {
    position: "top",
  });
  Object.assign(expense, {
    expenseName: "",
    expenseAmount: "",
    expenseCategory: "",
    id: null,
    date: Date.now(),
  });
  resetExpense();
};

const resetExpense = () => {
  Object.assign(expense, {
    expenseName: "",
    expenseAmount: "",
    expenseCategory: "",
    id: null,
    date: Date.now(),
  });
};
</script>

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

.addExpense {
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.input-container {
  width: 100%;
  background-color: rgb(243, 243, 243);
  height: 60px;
  padding: 20px;
  border-radius: 5px;
}
</style>
