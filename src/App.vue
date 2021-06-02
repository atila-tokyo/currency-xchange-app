<template>
<div class="container grid-lg my-2 py-2">
  <div class="card">
    <div class="card-header">
      <div class="h4">All currencies</div>
    </div>
    <div class="card-body">
     <ListCurrencies :quotes="quotes" />
    </div>
  </div>
</div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import api from '@/services/api'
import ListCurrencies from './components/ListCurrencies';

export default { 
  name: 'App',
  components: { ListCurrencies },
  setup() {

    const data = reactive({
      quotes: {},
    })

  onMounted(async () => {
    const response = await api.all();
    data.quotes = response.data
  });
    return { ...toRefs(data) }
  } 
}
</script>

<style>
</style>
