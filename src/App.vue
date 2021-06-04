<template>
  <div class="container grid-lg my-2 py-2">
    <div class="card mb-2" v-if="listenQuotations.length > 0">
      <div class="card-header">
        <div class="h4">Following</div>
      </div>
      <div class="card-body">
        <WatchList :listenQuotations="listenQuotations" @unlisten="onUnlisten" />
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="h4">All currencies</div>
      </div>
      <div class="card-body">
        <ListCurrencies 
        :quotes="quotes" 
        :listen-quotations="listenQuotations"
        @listen="onListen"
        @unlisten="onUnlisten" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import api from '@/services/api'
import ListCurrencies from './components/ListCurrencies';
import WatchList from './components/WatchList.vue';

export default { 
  name: 'App',
  components: { ListCurrencies, WatchList },
  setup() {

    const data = reactive({
      quotes: {},
      listenQuotations: [],
    });

  onMounted(async () => {
    const response = await api.all();
    data.quotes = response.data
  });

    const onListen = (code) => {
      data.listenQuotations.push(code)
    };

    const onUnlisten = (code) => {
      data.listenQuotations = data.listenQuotations.filter((key) => key != code);
    };
    
    return { 
      ...toRefs(data),
      onListen,
      onUnlisten,  
    };
  }, 
};
</script>

<style>
</style>
