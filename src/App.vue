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
          <h1
            v-if="expense.id !== null"
            class="text-center text-h5 font-weight-bold"
          >
            Edit <span class="text-orange-accent-3">Expense</span>
          </h1>
          <h1 v-else class="text-center text-h5 font-weight-bold">
            Add <span class="text-orange-accent-3">Expense</span>
          </h1>
          <div class="d-flex justify-center">
            <lord-icon
              src="https://cdn.lordicon.com/xoaqvsym.json"
              trigger="loop"
              delay="1000"
              colors="primary:#FF9100"
              style="width: 100px; height: 100px"
            >
            </lord-icon>
          </div>
          <v-row>
            <v-col cols="12">
              <FormExpense
                :categories="categories"
                :addCategory="addCategory"
                :id="expense.id"
                v-model:colorCategory="colorCategory"
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
          :spent="spent"
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
                v-if="expenses.filter((e) => e.active === true).length <= 0"
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
                  :categories="categories"
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
            <v-list-item v-if="expenses.length > 0">
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

            <v-card-title
              class="text-center font-weight-black text-h4 text-md-h3"
            >
              {{ expenseSelected[0].expenseName }}</v-card-title
            >
            <h1
              class="mt-5 text-grey-darken-2 text-center font-weight-medium text-h5 text-uppercase"
            >
              {{ expenseSelected[0].expenseCategory }}
            </h1>
            <div class="my-7">
              <h1
                class="text-red-accent-3 text-center text-h3 font-weight-bold"
              >
                {{ formatMoney(expenseSelected[0].expenseAmount) }}
              </h1>
            </div>
            <v-card-text class="text-h6"
              >{{ expenseSelected[0].expenseDescription }}
            </v-card-text>
            <p class="text-right font-weight-bold">
              {{ formatFecha(expenseSelected[0].date) }}
            </p>
            <v-card-actions>
              <v-row>
                <v-col cols="6" md="6" class="pa-1">
                  <v-btn
                    @click="editExpense"
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

        <v-dialog v-model="dialogDeleteExpense" width="auto">
          <v-card
            class="rounded-xl pa-6"
            min-width="300"
            max-width="400"
            height="500"
          >
            <v-card-title class="text-center font-weight-black text-h4">
              Delete Expense
            </v-card-title>
            <div class="w-100 d-flex justify-center">
              <lord-icon
                src="https://cdn.lordicon.com/krenhavm.json"
                trigger="loop"
                delay="1000"
                stroke="bold"
                state="hover-oscillate"
                colors="primary:#ff1744,secondary:#ff1744"
                style="width: 170px; height: 170px"
              >
              </lord-icon>
            </div>
            <v-card-text>
              <p>
                Are you sure you want to delete this expense? All of your data
                will be permanently removed. This action cannot be undone.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="12" class="pa-1">
                  <v-btn
                    @click="deleteExpense"
                    block
                    class="bg-red-accent-3 text-white font-weight-bold text-h6 text-capitalize"
                    height="40"
                    >Delete Expense</v-btn
                  >
                </v-col>
                <v-col cols="12" class="pa-1">
                  <v-btn
                    @click="dialogDeleteExpense = false"
                    block
                    class="bg-orange-accent-3 text-white font-weight-bold text-h6 text-capitalize"
                    height="40"
                    type="submit"
                  >
                    Cancel</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
import { ref, reactive, watch, onMounted } from "vue";
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
const spent = ref(0);
const budgetDefined = ref(false);
const modal = ref(false);
const addCategory = ref(false);
const dialogShowExpense = ref(false);
const expenseSelected = ref({});
const dialogDeleteExpense = ref(false);
const dialog3 = ref(false);
const expenses = ref([
  // {
  //   active: true,
  //   expenseName: "Cine",
  //   expenseDescription: "Ida al cine",
  //   expenseAmount: "10",
  //   expenseCategory: "😝 leisure",
  //   id: null,
  //   date: Date.now(),
  // },
]);

const colorCategory = ref("");
const snackbar = reactive({
  show: false,
  text: "",
});

const expense = reactive({
  active: false,
  expenseName: "",
  expenseDescription: "",
  expenseAmount: "",
  expenseCategory: "",
  id: null,
  date: Date.now(),
});

const categories = ref([]);
watch(
  [expenses, budget, categories],
  () => {
    const totalExpense = expenses.value
      .filter((e) => e.active === true)
      .reduce((total, exp) => total + parseFloat(exp.expenseAmount), 0);
    spent.value = totalExpense;
    available.value = budget.value - totalExpense;
    saveLocalStorage();
  },
  {
    deep: true,
  }
);

const defineBudget = () => {
  budgetDefined.value = true;
  // Lo gaurdamos en el localstorage
  localStorage.setItem("budget", JSON.stringify(budget.value));
};

const resetBudget = () => {
  budget.value = 0;
  budgetDefined.value = false;
};
const resetExpenses = () => {
  expenses.value = [];
  $toast.success("All expenses were eliminated! ", {
    position: "top",
  });
};
const resetApp = () => {
  budget.value = 0;
  budgetDefined.value = false;
  expenses.value = [];
  expenseSelected.value = {};
  $toast.success("All expenses were eliminated! ", {
    position: "top",
  });
};

const addExpense = () => {
  if (available.value === 0) {
    $toast.error(
      "There is no more money available! Add more money or eliminate some expenses! ",
      {
        position: "top",
      }
    );
    return;
  }
  modal.value = !modal.value;
  resetExpense();
};
const handleExpense = () => {
  if (addCategory.value) {
    if (!colorCategory.value) {
      snackbar.show = true;
      snackbar.text = "Please fill all fields.";
      setTimeout(() => {
        snackbar.show = false;
      }, 3000);
      return;
    }
    // VAlidamos de que la categoria no esta duplicada
    if (categories.value.length > 0) {
      const categoryExist = categories.value.some(
        (item) => item.value == expense.expenseCategory
      );
      if (categoryExist) {
        snackbar.show = true;
        snackbar.text = "Category already exists.";
        setTimeout(() => {
          snackbar.show = false;
        }, 3000);
        return;
      }
    }

    categories.value.push({
      label: expense.expenseCategory,
      color: colorCategory.value,
      value: expense.expenseCategory,
    });
  }
  if (expense.id !== null) {
    //BUscamos el index del objeto a modificar
    let index = expenses.value.findIndex((item) => item.id == expense.id);
    //Modificamos el elemento en la posicion encontrada
    expenses.value[index] = { ...expense };
    modal.value = false;
    dialogShowExpense.value = false;
    // expenseSelected.value = {};
    $toast.success("Expense modified succcessfully! ", {
      position: "top",
    });
  } else {
    if (Object.values(expense).includes("")) {
      snackbar.show = true;
      snackbar.text = "Please fill all fields.";
      setTimeout(() => {
        snackbar.show = false;
      }, 3000);
      return;
    }
    if (parseInt(expense.expenseAmount) > available.value) {
      snackbar.show = true;
      snackbar.text = "There is not enough money available.";
      setTimeout(() => {
        snackbar.show = false;
      }, 3000);
      return;
    }
    expense.id = uid();
    expense.active = true;
    expenses.value.unshift({ ...expense });
    modal.value = false;
    addCategory.value = false;

    $toast.success("Expense added succcessfully! ", {
      position: "top",
    });
  }

  Object.assign(expense, {
    active: false,
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
    active: false,
    expenseName: "",
    expenseDescription: "",
    expenseAmount: "",
    expenseCategory: "",
    id: null,
    date: Date.now(),
  });
  addCategory.value = false;
};

const otherCategory = () => {
  expense.expenseCategory = "";
  addCategory.value = !addCategory.value;
};

const showExpense = (id) => {
  dialogShowExpense.value = true;
  expenseSelected.value = expenses.value.filter((exp) => exp.id === id);
};

const deleteExpense = () => {
  const index = expenses.value.findIndex(
    (e) => e.id === expenseSelected.value[0].id
  );
  expenses.value[index].active = false;
  setTimeout(() => {
    expenses.value = expenses.value.filter((e) => e.id !== expenseSelected.id);
    expenseSelected.value = {};
  }, 100);
  dialogDeleteExpense.value = false;
  dialogShowExpense.value = false;
  $toast.success("Expense deleted succcessfully! ", {
    position: "top",
  });
};

const editExpense = () => {
  modal.value = true;
  // addCategory.value = true;
  // set the values of the form to the selected expense
  expense.id = expenseSelected.value[0].id;
  expense.date = expenseSelected.value[0].date;
  expense.expenseName = expenseSelected.value[0].expenseName;
  expense.active = expenseSelected.value[0].active;
  expense.expenseDescription = expenseSelected.value[0].expenseDescription;
  expense.expenseAmount = expenseSelected.value[0].expenseAmount;
  expense.expenseCategory = expenseSelected.value[0].expenseCategory;
};
const saveLocalStorage = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses.value));
  localStorage.setItem("categories", JSON.stringify(categories.value));
};
onMounted(() => {
  const budgetStorage = localStorage.getItem("budget");
  const expensesStorage = localStorage.getItem("expenses");
  const categoriesStorage = localStorage.getItem("categories");

  if (categoriesStorage) {
    categories.value = JSON.parse(categoriesStorage);
  }
  if (budgetStorage) {
    budget.value = JSON.parse(budgetStorage);
    budgetDefined.value = true;
    available.value = budget.value;
  }
  if (expensesStorage) {
    expenses.value = JSON.parse(expensesStorage);
  }
  if (categories.value.length <= 0) {
    addCategory.value = true;
  }
});
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
