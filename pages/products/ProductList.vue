<script setup>
  const props = defineProps({
    products: Array,
  });
  
  function formatCurrency(value) {
    return `$${(value).toFixed(2)}`;
  }
</script>

<template>
  <ul v-if="props.products.length > 0">
    <li v-for="product in props.products" :data-id="product.id">
      {{ product.name }}:
      {{ formatCurrency(product.price) }}
		</li>
	</ul>
</template>
