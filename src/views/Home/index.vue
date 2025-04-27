<template>
  <div class="container">
    <div class="header">
      <h1>Lista de Tarefas</h1>
      <button class="btn-add" @click="abrirModalAdicionar">Adicionar Tarefa</button>
    </div>

    <table class="task-table">
      <thead>
        <tr>
          <th style="width: 20%; max-width: 200px;"></th>
          <th>Título</th>
          <th>Descrição</th>
          <th>Data Criação</th>
          <th>Data Conclusão</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarefa in tarefas" :key="tarefa.id_tarefa">
          <td class="actions">
            <button class="btn-edit" @click="editarTarefa(tarefa)">Editar</button>
            <button class="btn-delete" @click="confirmarDelete(tarefa)">Excluir</button>
            <button
              class="btn-complete"
              :disabled="tarefa.dt_conclusao"
              @click="confirmarConclusao(tarefa)"
            >
              Concluir
            </button>
          </td>
          <td>{{ tarefa.titulo }}</td>
          <td>{{ tarefa.descricao }}</td>
          <td>{{ formatarData(tarefa.dt_criacao) }}</td>
          <td>{{ tarefa.dt_conclusao ? formatarData(tarefa.dt_conclusao) : '-' }}</td>
        </tr>
      </tbody>
    </table>

    <ModalAdicionaEditaTarefa
      v-model="modalAdicionarEditar"
      :tarefa="tarefaSelecionada"
      @close="modalAdicionarEditar = false"
      @salvar="salvarTarefa"
    />

    <ModalDeletaTarefa
      v-model="modalDeletar"
      @close="modalDeletar = false"
      @confirmar="deletarTarefa"
    />

    <ModalConcluiTarefa
      v-model="modalConcluir"
      @confirmar="concluirTarefa"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ModalAdicionaEditaTarefa from '../../components/ModalAdicionaEditaTarefa/index.vue';
import ModalDeletaTarefa from '../../components/ModalDeletaTarefa/index.vue';
import ModalConcluiTarefa from '../../components/ModalConcluiTarefa/index.vue';

const tarefas = ref([]);
const modalAdicionarEditar = ref(false);
const modalDeletar = ref(false);
const modalConcluir = ref(false);
const tarefaSelecionada = ref(null);
const tarefaParaConcluir = ref(null);

onMounted(buscarTarefas);

async function buscarTarefas() {
  const response = await axios.get('http://localhost:5250/tarefas');
  tarefas.value = response.data;
}

function abrirModalAdicionar() {
  tarefaSelecionada.value = null;
  modalAdicionarEditar.value = true;
}

function editarTarefa(tarefa) {
  tarefaSelecionada.value = tarefa;
  modalAdicionarEditar.value = true;
}

async function salvarTarefa(dados) {
  if (tarefaSelecionada.value) {
    await axios.patch(`http://localhost:5250/tarefas/${tarefaSelecionada.value.id_tarefa}`, dados);
  } else {
    await axios.post('http://localhost:5250/tarefas', dados);
  }
  await buscarTarefas();
}

function confirmarDelete(tarefa) {
  tarefaSelecionada.value = tarefa;
  modalDeletar.value = true;
}

async function deletarTarefa() {
  await axios.delete(`http://localhost:5250/tarefas/${tarefaSelecionada.value.id_tarefa}`);
  modalDeletar.value = false;
  await buscarTarefas();
}

function confirmarConclusao(tarefa) {
  tarefaParaConcluir.value = tarefa;
  modalConcluir.value = true;
}

async function concluirTarefa() {
  if (!tarefaParaConcluir.value) return;
  await axios.patch(`http://localhost:5250/tarefas/${tarefaParaConcluir.value.id_tarefa}/concluir`);
  modalConcluir.value = false;
  await buscarTarefas();
}

function formatarData(data) {
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

.btn-add {
  background-color: #4CAF50;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #45a049;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
}

.task-table th,
.task-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.task-table th {
  background-color: #f2f2f2;
}

.actions {
  display: flex;
  gap: 5px;
  justify-content: center;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-complete {
  background-color: #9c27b0;
  color: white;
}

.btn-complete:disabled {
  background-color: #d1c4e9;
  cursor: not-allowed;
}

button:hover:enabled {
  opacity: 0.8;
}
</style>
