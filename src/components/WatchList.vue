<template>
    <ListCurrencies 
    :quotes="quotes" 
    :listen-quotations="listenQuotations" 
    @unlisten="onUnlist" 
    />
    <div class="mt-2 text-right">
    <cite class="text-small">
        Updating again in <b>{{ nextUpdate }} seconds</b>
    </cite>
    </div>
</template>

<script>
import ListCurrencies from './ListCurrencies'
import { onMounted, reactive, ref, toRefs, watch } from 'vue';
import api from '@/services/api';

const CURRENT_UPDATE_TIME = 30;

export default {
    components: { ListCurrencies },
    props: {
        listenQuotations: { type: Array, required: true }
    },
    setup(props, { emit }) {
       const interval = ref(null);
       const quotes = ref({});
       const nextUpdate = ref(CURRENT_UPDATE_TIME
);

       const methods = reactive({
           onUnlisten(code) {
               emit('unlisten', code)
           },

           restartInterval() {
               clearInterval(interval.value);
               nextUpdate.value = interval.value = CURRENT_UPDATE_TIME
               interval.value = setInterval(() => {
                   nextUpdate.value -= 1;
                   if (nextUpdate.value === 0) {
                       nextUpdate.value = CURRENT_UPDATE_TIME;
                       this.refresher();
                   }
               })
           },

           async refresher() {
               const { data } = await api.listen(props.listenQuotations);
               quotes.value = data;
           }
       });

       onMounted(() => {
           methods.refresher();
       });

       watch(props, () => {
           methods.refresher()
       });

       
       return { 
        ...toRefs(methods),
        quotes, 
        nextUpdate 
       };
    }
}
</script>
