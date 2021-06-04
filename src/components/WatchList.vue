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

export default {
    components: { ListCurrencies },
    props: {
        listenQuotations: { type: Array, required: true }
    },
    setup(props, { emit }) {
    //    const interval = ref(null);
       const quotes = ref({});
       const nextUpdate = ref(30);

       const methods = reactive({
           onUnlisten(code) {
               emit('unlisten', code)
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
