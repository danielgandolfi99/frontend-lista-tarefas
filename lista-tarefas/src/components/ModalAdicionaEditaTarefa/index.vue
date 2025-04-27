<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2>{{ tarefa.id_tarefa ? 'Editar Tarefa' : 'Adicionar Tarefa' }}</h2>
        <button class="close-button" @click="fecharModal">✖</button>
      </div>

      <form @submit.prevent="salvarTarefa">
        <div class="form-group">
          <label for="titulo">Título</label>
          <input id="titulo" v-model="tarefa.titulo" required />
        </div>

        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" v-model="tarefa.descricao" rows="4"></textarea>
        </div>

        <div class="modal-footer">
          <button type="submit" class="save-button">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  tarefa: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'salvar'])

const tarefa = reactive({
  id_tarefa: null,
  titulo: '',
  descricao: ''
})

watch(() => props.tarefa, (editaTarefa) => {
  if (editaTarefa && editaTarefa.id_tarefa) {
    tarefa.id_tarefa = editaTarefa.id_tarefa;
    tarefa.titulo = editaTarefa.titulo;
    tarefa.descricao = editaTarefa.descricao;
  } else {
    tarefa.id_tarefa = null;
    tarefa.titulo = '';
    tarefa.descricao = '';
  }
}, { immediate: true })

const isOpen = computed({
  get: () => props.modelValue,
  set: (valor) => emit('update:modelValue', valor)
})

function fecharModal() {
  isOpen.value = false
}

function salvarTarefa() {
  emit('salvar', { titulo: tarefa.titulo, descricao: tarefa.descricao })
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
  margin-bottom: 20px;
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

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus, textarea:focus {
  border-color: #1976d2;
  box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
  outline: none;
}

.modal-footer {
  margin-top: 20px;
}

.save-button {
  width: 100%;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #1565c0;
}
</style>
