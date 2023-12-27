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
              <FormExpense
                :categories="categories"
                :addCategory="addCategory"
                v-model:expenseName="expense.expenseName"
                v-model:expenseDescription="expense.expenseDescription"
                v-model:expenseAmount="expense.expenseAmount"
                v-model:expenseCategory="expense.expenseCategory"
                v-model:newCategory="newCategory"
                @handle-expense="handleExpense"
                @other-category="otherCategory"
                @add-expense="addExpense"
              />
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
                <Expense
                  v-for="exp in expenses"
                  :exp="exp"
                  @show-expense="showExpense"
                />
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
    <div>
      <v-row justify="center">
        <v-dialog v-model="dialogShowExpense" width="auto">
          <v-card class="rounded-xl pa-6" min-width="300" height="450">
            <v-row>
              <v-col cols="12" class="d-flex justify-end pa-0">
                <v-btn
                  @click="dialogShowExpense = false"
                  class="bg-transparent elevation-0 text-grey-lighten-1"
                  width="50"
                  >Close
                </v-btn>
              </v-col>
            </v-row>

            <v-card-title class="text-center font-weight-black text-h3">
              {{ expenseToShow[0].expenseName }}</v-card-title
            >
            <h1
              class="mt-5 text-grey-darken-2 text-center font-weight-medium text-h5 text-uppercase"
            >
              {{ expenseToShow[0].expenseCategory }}
            </h1>
            <div class="my-7">
              <h1
                class="text-red-accent-3 text-center text-h3 font-weight-bold"
              >
                {{ formatMoney(expenseToShow[0].expenseAmount) }}
              </h1>
            </div>
            <v-card-text class="text-h6"
              >{{ expenseToShow[0].expenseDescription }}
            </v-card-text>
            <p class="text-right font-weight-bold">
              {{ formatFecha(expenseToShow[0].date) }}
            </p>
            <v-card-actions>
              <v-row>
                <v-col cols="6" md="6" class="pa-1">
                  <v-btn
                    block
                    class="bg-orange-accent-3 text-white font-weight-bold text-h6 text-capitalize"
                    height="40"
                    type="submit"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/wuvorxbv.json"
                      trigger="click"
                      colors="primary:#ffffff,secondary:#ffffff"
                      style="width: 30px; height: 30px"
                    >
                    </lord-icon
                  ></v-btn>
                </v-col>
                <v-col cols="6" md="6" class="pa-1">
                  <v-btn
                    @click="dialogDeleteExpense = true"
                    block
                    class="bg-red-accent-3 text-white font-weight-bold text-h6 text-capitalize"
                    height="40"
                    ><lord-icon
                      src="https://cdn.lordicon.com/drxwpfop.json"
                      trigger="click"
                      stroke="bold"
                      colors="primary:#ffffff,secondary:#ffffff"
                      style="width: 30px; height: 30px"
                    >
                    </lord-icon
                  ></v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- <v-dialog v-model="dialogDeleteExpense" width="auto">
          <v-card>
            <v-card-title> Dialog 2 </v-card-title>
            <v-card-text>
              <v-btn color="primary" @click="dialog3 = !dialog3">
                Delete Expense
              </v-btn>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                variant="text"
                @click="dialogDeleteExpense = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->

        <!-- <v-dialog v-model="dialog3" width="auto">
          <v-card>
            <v-card-title>
              <span>Dialog 3</span>
            </v-card-title>
            <v-card-actions>
              <v-btn color="primary" variant="text" @click="dialog3 = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import Budget from "./components/Budget.vue";
import ControlBudget from "./components/ControlBudget.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Expense from "./components/Expense.vue";
import FormExpense from "./components/FormExpense.vue";
import { uid } from "uid";
import { formatMoney, formatFecha } from "./helpers";
const $toast = useToast();

import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

defineElement(lottie.loadAnimation);
const budget = ref("");
const available = ref(0);
const budgetDefined = ref(false);
const modal = ref(false);
const addCategory = ref(false);
const dialogShowExpense = ref(false);
const expenseToShow = ref({});
const dialogDeleteExpense = ref(false);
const dialog3 = ref(false);
const newCategory = ref("");
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
  expenseDescription: "",
  expenseAmount: "",
  expenseCategory: "",
  id: null,
  date: Date.now(),
});
const expenses = ref([]);

const categories = [
  { value: "", label: "-- Select --" },
  { value: "💰 savings", label: "💰 Savings" },
  { value: "🍽️ food", label: "🍽️ Food" },
  { value: "🏡 home", label: "🏡 Home" },
  { value: "💵 expenses", label: "💵 Various Expenses" },
  { value: "😝 leisure", label: "😝 Leisure" },
  { value: "🏥 health", label: "🏥 Health" },
  { value: "👾 subscriptions", label: "👾 Subscriptions" },
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
  if (newCategory.value !== "") {
    expense.expenseCategory = newCategory.value;
    categories.push({
      label: newCategory.value,
      value: newCategory.value,
    });
  }

  if (Object.values(expense).includes("")) {
    snackbar.show = true;
    snackbar.text = "Please fill all fields.";
    setTimeout(() => {
      snackbar.show = false;
    }, 3000);
    return;
  }
  expense.id = uid();
  expenses.value.unshift({ ...expense });
  modal.value = false;
  $toast.success("Expense added succcessfully! ", {
    position: "top",
  });
  Object.assign(expense, {
    expenseName: "",
    expenseAmount: "",
    expenseDescription: "",
    expenseCategory: "",
    id: null,
    date: Date.now(),
  });
  resetExpense();
};

const resetExpense = () => {
  Object.assign(expense, {
    expenseName: "",
    expenseDescription: "",
    expenseAmount: "",
    expenseCategory: "",
    id: null,
    date: Date.now(),
  });
  addCategory.value = false;
  newCategory.value = "";
};

const otherCategory = () => {
  expense.expenseCategory = "";
  addCategory.value = !addCategory.value;
};

const showExpense = (id) => {
  dialogShowExpense.value = true;
  expenseToShow.value = expenses.value.filter((exp) => exp.id === id);
  console.log(expenseToShow.value);
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
.close-container {
  position: absolute;
  left: 150px;
}
</style>
