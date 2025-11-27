<template>
    <NuxtPage />
    <WhatsAppButton />
  </template>
  
  <script setup>
  definePageMeta({
    middleware: 'auth'
  })
  </script>