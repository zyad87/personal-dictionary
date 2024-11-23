<template>
  <div class="product-form-container">
    <h2 class="form-title">{{ editMode ? 'Update Product' : 'Inventory Management System' }}</h2>
    <form @submit.prevent="submitHandler" class="product-form">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Product Name:</label>
          <input type="text" id="name" v-model="name" required placeholder="Enter product name" class="input" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" id="price" v-model="price" required    placeholder="Enter price" class="input" />
        </div>
        <div class="form-group">
          <label for="taxes">Taxes (%):</label>
          <input type="number" id="taxes" v-model="taxes" required    placeholder="Enter taxes" class="input" />
        </div>
        <div class="form-group">
          <label for="ads">Ads:</label>
          <input type="number" id="ads" v-model="ads" required    placeholder="Enter ads cost" class="input" />
        </div>
        <div class="form-group">
          <label for="discount">Discount:</label>
          <input type="number" id="discount" v-model="discount" required    placeholder="Enter discount" class="input" />
        </div>
        <div class="form-group">
          <label>Total:</label>
          <div :class="['total-display', total <= 0 ? 'bg-red-600' : 'bg-green-600']">{{ total }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" v-model="quantity" required min="1" placeholder="Enter quantity" class="input" />
        </div>
        <div class="form-group">
          <label for="category">Category:</label>
          <input type="text" id="category" v-model="category" required placeholder="Enter category" class="input" />
        </div>
      </div>
      <button type="submit" class="submit-button">{{ editMode ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['editProductData'],
  data() {
    return {
      name: "",
      price: "",
      taxes: "",
      ads: "",
      discount: "",
      quantity: 1,
      category: "",
      editMode: false,
      productIndex: null,
    };
  },
  computed: {
  total() {
    if (!this.price || this.price <= 0) {
      return 0; // لا يتم الحساب إذا لم يتم إدخال سعر
    }
    // الضريبة محسوبة كنسبة مئوية من السعر
    const taxAmount = (this.price * this.taxes) / 100;

    // الحساب الكلي
    return (this.price + taxAmount + this.ads - this.discount).toFixed(2);
  },
  calculatedTax() {
    // حساب الضريبة بشكل مستقل
    if (!this.price || this.price <= 0) {
      return 0;
    }
    return ((this.price * this.taxes) / 100).toFixed(2); // القيمة المحسوبة للضريبة
  },
},


  watch: {
    editProductData: {
      handler(newValue) {
        if (newValue) {
          this.name = newValue.name;
          this.price = newValue.price;
          this.taxes = newValue.taxes;
          this.ads = newValue.ads;
          this.discount = newValue.discount;
          this.quantity = newValue.quantity;
          this.category = newValue.category;
          this.editMode = true;
          this.productIndex = newValue.index;
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['addProduct', 'updateProduct']),
    submitHandler() {
  if (this.editMode) {
    const updatedProduct = {
      name: this.name,
      price: this.price,
      taxes: this.calculatedTax, // الضريبة المحسوبة
      ads: this.ads,
      discount: this.discount,
      total: this.total,
      quantity: this.quantity,
      category: this.category,
    };
    this.updateProduct({ index: this.productIndex, updatedProduct }).then(() => {
      this.$store.dispatch('fetchProducts');
    });
    this.editMode = false;
  } else {
    for (let i = 0; i < this.quantity; i++) {
      const newProduct = {
        id: Date.now() + i,
        name: this.name,
        price: this.price,
        taxes: this.calculatedTax, // الضريبة المحسوبة
        ads: this.ads,
        discount: this.discount,
        total: this.total,
        quantity: 1,
        category: this.category,
      };
      this.addProduct(newProduct);
    }
  }
  this.resetForm();
},

    resetForm() {
      this.name = "";
      this.price = "";
      this.taxes = "";
      this.ads = "";
      this.discount = "";
      this.quantity = 1;
      this.category = "";
      this.editMode = false;
    },
  },
};
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@^2/dist/tailwind.min.css';

.product-form-container {
  @apply bg-gray-800 text-white rounded-lg p-8 w-11/12 max-w-6xl mx-auto shadow-2xl;
}

.form-title {
  @apply text-center text-white mb-8 font-extrabold text-4xl;
}

.product-form {
  @apply flex flex-col;
}

.form-row {
  @apply flex flex-wrap gap-6 mb-6;
}

.form-group {
  @apply flex-1;
}

label {
  @apply font-semibold mb-2 block text-lg;
}

.input {
  @apply w-full p-4 border border-gray-600 rounded-lg text-base bg-gray-700 text-white transition-colors duration-300 ease-in-out;
}

.input:focus {
  @apply border-blue-500;
}

.total-display {
  @apply p-4 rounded-lg font-bold text-center text-white text-lg;
}

.submit-button {
  @apply bg-blue-600 text-white py-4 px-6 rounded-lg text-xl cursor-pointer transition duration-300 ease-in-out;
}

.submit-button:hover {
  @apply bg-blue-700;
}
</style>
