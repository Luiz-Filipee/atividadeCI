let clientes = [];
let idAtual = 1;

function listarClientes() {
  return clientes;
}

function buscarClientePorId(id) {
  return clientes.find(c => c.id === id);
}

function criarCliente(cliente) {
  const novoCliente = { id: idAtual++, ...cliente };
  clientes.push(novoCliente);
  return novoCliente;
}

function atualizarCliente(id, dados) {
  const index = clientes.findIndex(c => c.id === id);
  if (index === -1) return null;
  clientes[index] = { ...clientes[index], ...dados };
  return clientes[index];
}

function deletarCliente(id) {
  const index = clientes.findIndex(c => c.id === id);
  if (index === -1) return false;
  clientes.splice(index, 1);
  return true;
}

function resetarDados() {
  clientes = [];
  idAtual = 1;
}

module.exports = {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  deletarCliente,
  resetarDados
};
