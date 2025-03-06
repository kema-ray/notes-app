<template>
    <div>
        <h1>Hello World</h1>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth'],
})
</script>