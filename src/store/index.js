// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addProduct(state, newProduct) {
      state.products.push(newProduct);
    },
    updateProduct(state, { index, updatedProduct }) {
      state.products.splice(index, 1, updatedProduct);
    },
    deleteProduct(state, index) {
      state.products.splice(index, 1);
    },
  },
  actions: {
    fetchProducts({ commit }) {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      commit('setProducts', products);
    },
    addProduct({ commit, state }, newProduct) {
      commit('addProduct', newProduct);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    updateProduct({ commit, state }, { index, updatedProduct }) {
      commit('updateProduct', { index, updatedProduct });
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    deleteProduct({ commit, state }, index) {
      commit('deleteProduct', index);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
  },
  getters: {
    allProducts: (state) => state.products,
  },
});

export default store;

// To install Vuex, run the following command in your terminal:
// npm install vuex

// Usage in your Vue application:
// 1. Import the store in your main.js file:
// import store from './store';

// 2. Add the store to your Vue instance:
// import { createApp } from 'vue';
// import App from './App.vue';
// import store from './store';

// const app = createApp(App);
// app.use(store);
// app.mount('#app');
