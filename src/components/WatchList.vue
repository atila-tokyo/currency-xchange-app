<template>
    <ListCurrencies :quotes="quotes" />
</template>

<script>
import ListCurrencies from './ListCurrencies'

export default {
    components: { ListCurrencies },
    setup() {
       const quotes = ref({})
       
       
       return { quotes };
    }
}
</script>
