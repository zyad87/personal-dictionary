<template>
  <div id="app" class="inventory-app">
    <main class="app-main">
      <ProductForm :editProductData="editProductData" />
      <ProductList @edit-product="setEditProductData" />
    </main>
    <footer class="app-footer">
      <p>Made with <span class="heart">&hearts;</span> using Vue.js and Local Storage</p>
    </footer>
  </div>
</template>

<script>
import ProductForm from "./components/ProductForm.vue";
import ProductList from "./components/ProductList.vue";
import { mapActions } from 'vuex';

export default {
  components: {
    ProductForm,
    ProductList,
  },
  data() {
    return {
      editProductData: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(['fetchProducts']),
    setEditProductData(product, index) {
      if (product) {
        this.editProductData = { ...product, index };
      }
    },
  },
};
</script>


<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@^2/dist/tailwind.min.css';

.inventory-app {
  @apply flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800;
}

.app-header {
  @apply bg-green-600 p-5 text-center text-white shadow-lg;
}

.app-title {
  @apply text-3xl m-0;
}

.app-main {
  @apply flex-1 p-5 flex flex-col items-center;
}

.app-footer {
  @apply bg-green-600 text-white text-center p-3;
}

.heart {
  @apply text-red-500;
}
</style>
