<template>
  <!-- trigger -->
  <button @click="open = true" class="btn">
    {{ buttonText }}
  </button>

  <!-- modal -->
  <div v-if="open" class="overlay" @click.self="close">
    <div class="modal">

      <!-- ✅ close button（固定右上） -->
      <button class="close" @click="close" aria-label="Close">
        ✕
      </button>

      <iframe
        :src="src"
        width="100%"
        height="600"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

// 👉 props
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Open Form'
  }
})

const open = ref(false)

const close = () => {
  open.value = false
}

// 👉 UX: lock scroll
watch(open, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

// 👉 ESC close
const handleKey = (e) => {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', handleKey))
onUnmounted(() => window.removeEventListener('keydown', handleKey))
</script>

<style scoped>
.btn {
  background: var(--vp-c-brand);
  /* color: white; */
  padding: 10px 16px;
  border-radius: 8px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background: white;
  width: 90%;
  max-width: 800px;
  border-radius: 12px;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close {
  align-self: end;
  padding: 12px;
  color: black;
}
</style>