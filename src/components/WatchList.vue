<template>
    <ListCurrencies :quotes="quotes" :listen-quotations="listenQuotations" />
    <div class="mt-2 text-right">
    <cite class="text-small">
        Updating again in <b>{{ nextUpdate }} seconds</b>
    </cite>
    </div>
</template>

<script>
import ListCurrencies from './ListCurrencies'
import { ref } from 'vue';

export default {
    components: { ListCurrencies },
    props: {
        listenQuotations: { type: Array, required: true }
    },
    setup() {
       const quotes = ref({})
       const nextUpdate = ref(30);
       
       return { quotes, nextUpdate };
    }
}
</script>
