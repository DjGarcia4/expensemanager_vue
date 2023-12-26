<template>
  <div>
    <v-container class="bg-white rounded-xl elevation-14 pa-8 pa-md-12">
      <form @submit.prevent="handleSubmit">
        <v-row class="d-flex justify-center">
          <v-col cols="12">
            <div class="text-center">
              <label for="budget" class="font-weight-bold text-h5"
                >Add Your Budget</label
              >
              <input
                type="number"
                placeholder="Example: 100"
                id="budget"
                @input="$emit('update:budget', Number($event.target.value))"
                :value="budget"
                min="0"
                class="input-container text-center"
              />
            </div>
            <v-btn
              type="submit"
              block
              class="mt-2 bg-orange-accent-3 text-white font-weight-bold text-h5 text-capitalize"
              height="40"
              >Define Budget</v-btn
            >
          </v-col>
        </v-row>
      </form>
    </v-container>
    <lord-icon
      src="https://cdn.lordicon.com/ofdfurqa.json"
      trigger="loop"
      delay="2000"
      stroke="regular"
      colors="primary:#ff9100,secondary:#ff9100"
      style="width: 250px; height: 250px"
    >
    </lord-icon>
  </div>
</template>

<script setup>
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();
const emit = defineEmits(["update:budget", "define-budget"]);
const props = defineProps({
  budget: {
    require: true,
  },
});

const handleSubmit = () => {
  if (Object.values(props).includes("") || props.budget === 0) {
    $toast.error("Please define a budget", {
      position: "top",
    });
    return;
  }
  if (props.budget.length <= 2) {
    $toast.error("Budget must be more than 2 digits", {
      position: "top",
    });
    return;
  }
  if (props.budget < 100) {
    $toast.error("Budget must be more than 100 ", {
      position: "top",
    });
    return;
  }
  emit("define-budget");
};
// export default {
//   data: () => ({
//     valid: false,
//     budget: "",
//     budgetRules: [
//       (value) => {
//         if (value) return true;

//         return "Budget is required.";
//       },
//       (value) => {
//         if (value?.length > 2) return true;

//         return "Budget must be more than 2 digits.";
//       },
//     ],
//   }),
// };
</script>

<style scoped>
.input-container {
  width: 100%;
  background-color: rgb(243, 243, 243);
  height: 30px;
  padding: 20px;
  border-radius: 5px;
  font-weight: bold;
}
</style>
