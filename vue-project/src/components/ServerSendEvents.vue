<script setup lang="ts">
import {onMounted, ref} from 'vue'
  import axios from 'axios'
  defineProps<{
    msg: string
  }>()
  const messages = ref([])
  const message = ref('')

  const send = async () => {
    if (message) {
      await axios.post('http://localhost:5000/new-message', {
        message: message.value,
        date: new Date()
      })
      message.value = ''
    }
  }

  const subscrube = async () => {
      const eventSource = new EventSource('http://localhost:5000/connect')
      eventSource.onmessage = function(event) {
        const message = JSON.parse(event.data)
        messages.value = [ message, ...messages.value ]
      }
  }

  onMounted(() => {
    subscrube()
  })
</script>

<template>
  <div>
    <textarea v-model="message" style="display: block;"></textarea>
    <button @click="send">Send</button>
  </div>
  <div v-for="message in messages" key="message.date">
    {{ message.message }}
  </div>
</template>

<style scoped>
</style>
