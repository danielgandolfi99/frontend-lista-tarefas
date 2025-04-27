<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Excluir Tarefa</h2>
        <button class="close-button" @click="fecharModal">✖</button>
      </div>

      <div class="modal-content">
        <p>Tem certeza que deseja excluir esta tarefa?</p>
      </div>

      <div class="modal-footer">
        <button class="delete-button" @click="confirmarExclusao">Confirmar Exclusão</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'confirmar'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (valor) => emit('update:modelValue', valor)
})

function fecharModal() {
  isOpen.value = false
}

function confirmarExclusao() {
  emit('confirmar')
  fecharModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-button {
  background: none;
  border: 1px solid red;
  color: red;
  font-size: 18px;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background: red;
  color: white;
}

.modal-content {
  text-align: start;
  margin-bottom: 20px;
  font-size: 16px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.cancel-button, .delete-button {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
}

.cancel-button:hover {
  background-color: #b0b0b0;
}

.delete-button {
  background-color: #d32f2f;
  color: white;
}

.delete-button:hover {
  background-color: #c62828;
}
</style>
