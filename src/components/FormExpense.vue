<template>
  <div>
    <form @submit.prevent="emit('handle-expense')">
      <v-row class="d-flex justify-center">
        <v-col cols="12">
          <div class="mt-3">
            <label for="expenseName" class="font-weight-bold text-h6"
              >Expense Name</label
            >
            <input
              :value="expenseName"
              @input="$emit('update:expenseName', $event.target.value)"
              id="expenseName"
              type="text"
              placeholder="Example: Social Life"
              min="0"
              class="input-container w-100 font-weight-bold"
            />
          </div>
          <div class="mt-3">
            <label for="expenseAmount" class="font-weight-bold text-h6"
              >Amount</label
            >
            <input
              :value="expenseAmount"
              @input="$emit('update:expenseAmount', $event.target.value)"
              id="expenseAmount"
              type="number"
              placeholder="Example: 100"
              min="0"
              class="input-container w-100 font-weight-bold"
            />
          </div>
          <div class="mt-3">
            <label for="expenseDescription" class="font-weight-bold text-h6"
              >Description</label
            >
            <textarea
              :value="expenseDescription"
              @input="$emit('update:expenseDescription', $event.target.value)"
              id="expenseDescription"
              placeholder="Describe your expense"
              type="number"
              min="0"
              class="input-container w-100 font-weight-bold"
            />
          </div>
          <div class="mt-3">
            <label for="expenseCategorie" class="font-weight-bold text-h6"
              >Category
            </label>
            <v-row>
              <v-col cols="9" class="d-flex">
                <Transition
                  name="custom-classes"
                  enter-active-class="animate__animated animate__backInLeft"
                  leave-active-class="animate__animated animate__backOutLeft"
                >
                  <select
                    v-if="!props.addCategory"
                    class="input-container font-weight-bold"
                    :value="expenseCategory"
                    @input="
                      $emit('update:expenseCategory', $event.target.value)
                    "
                  >
                    <option
                      v-for="category in props.categories"
                      :key="category.value"
                      :value="category.value"
                    >
                      {{ category.label }}
                    </option>
                  </select>
                </Transition>
                <Transition
                  name="custom-classes"
                  enter-active-class="animate__animated animate__backInRight"
                  leave-active-class="animate__animated animate__backOutRight"
                >
                  <input
                    v-if="props.addCategory"
                    :value="newCategory"
                    @input="$emit('update:newCategory', $event.target.value)"
                    id="newCategory"
                    type="text"
                    placeholder="New Category"
                    min="0"
                    class="input-container w-100 font-weight-bold"
                  />
                </Transition>
              </v-col>
              <v-col cols="3">
                <v-btn
                  @click="emit('other-category')"
                  class="bg-transparent elevation-0 pa-2 h-100"
                >
                  <lord-icon
                    v-if="!props.addCategory"
                    src="https://cdn.lordicon.com/zrkkrrpl.json"
                    trigger="click"
                    stroke="bold"
                    colors="primary:#e88c30,secondary:#e88c30"
                    style="width: 50px; height: 50px"
                  >
                  </lord-icon>
                  <lord-icon
                    v-else
                    src="https://cdn.lordicon.com/dykoqszm.json"
                    trigger="click"
                    colors="primary:#e88c30,secondary:#e88c30"
                    style="width: 50px; height: 50px"
                  >
                  </lord-icon
                ></v-btn>
              </v-col>
            </v-row>
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
            @click="emit('add-expense')"
            >Cancel</v-btn
          >
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    require: true,
  },
  addCategory: {
    require: true,
  },
  expenseName: {
    type: String,
    require: true,
  },
  expenseDescription: {
    type: String,
    require: true,
  },
  expenseAmount: {
    require: true,
  },
  expenseCategory: {
    type: String,
    require: true,
  },
  newCategory: {
    type: String,
    require: true,
  },
});

const emit = defineEmits([
  "update:expenseName",
  "update:expenseDescription",
  "update:expenseAmount",
  "update:expenseCategory",
  "update:newCategory",
  "handle-expense",
  "other-category",
  "add-expense",
]);
</script>

<style scoped></style>
