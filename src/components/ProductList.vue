<template>
  <div class="product-list-container mt-5">
    <h2 class="list-title">Product List</h2>
    <div v-if="allProducts && allProducts.length" class="table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Taxes</th>
            <th>Ads</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Category</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in allProducts" :key="product.id" class="product-row">
            <td>{{ index + 1 }}</td>
            <td>{{ product.name || 'N/A' }}</td>
            <td>${{ product.price || 0 }}</td>
            <td>{{ product.taxes || 0 }}</td>
            <td>{{ product.ads || 0 }}</td>
            <td>{{ product.discount || 0 }}</td>
            <td>{{ product.total || 0 }}</td>
            <td>{{ product.category || 'N/A' }}</td>
            <td><button @click="editProduct(index)" class="update-button">Update</button></td>
            <td><button @click="confirmDeleteProduct(index)" class="delete-button">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="no-products">No products available. Start adding new products!</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
  computed: {
    ...mapGetters(['allProducts']),
  },
  methods: {
    ...mapActions(['fetchProducts', 'updateProduct', 'deleteProduct']),
    editProduct(index) {
      const product = this.allProducts[index];
      if (product) {
        this.$emit('edit-product', product, index);
      }
    },
    confirmDeleteProduct(index) {
      const product = this.allProducts[index];
      if (!product) return;
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(index).then(() => {
            this.fetchProducts(); // Refresh the product list after deletion
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            );
          }).catch(error => {
            console.error('Error deleting product:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the product. Please try again.',
              'error'
            );
          });
        }
      });
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@^2/dist/tailwind.min.css';

.product-list-container {
  @apply bg-gray-800 text-white rounded-lg p-8 w-11/12 max-w-6xl mx-auto shadow-2xl;
}

.list-title {
  @apply text-center text-white mb-8 font-extrabold text-4xl;
}

.table-wrapper {
  overflow-x: auto; /* استخدام CSS التقليدي بدلاً من @apply */
}

.product-table {
  @apply w-full text-left bg-gray-900;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  @apply border-b border-gray-700 py-4 px-6;
}

.product-table th {
  @apply text-gray-400 font-semibold;
}

.product-row:hover {
  @apply bg-gray-700;
}

.update-button,
.delete-button {
  @apply py-2 px-4 rounded-lg text-white transition duration-300;
}

.update-button {
  @apply bg-blue-600 hover:bg-blue-700;
}

.delete-button {
  @apply bg-red-600 hover:bg-red-700;
}

.no-products {
  @apply text-center text-gray-400 font-semibold;
}
</style>
