const clienteModel = require('../models/clienteModel');
const clienteSchema = require('../validators/clienteValidator');

function validarCliente(req, res, next) {
  const { error } = clienteSchema.validate(req.body);
  if (error) return res.status(400).json({ erro: error.details[0].message });
  next();
}

function listar(req, res) {
  res.json(clienteModel.listarClientes());
}

function buscar(req, res) {
  const cliente = clienteModel.buscarClientePorId(Number(req.params.id));
  if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
  res.json(cliente);
}

function criar(req, res) {
  const novoCliente = clienteModel.criarCliente(req.body);
  res.status(201).json(novoCliente);
}

function atualizar(req, res) {
  const clienteAtualizado = clienteModel.atualizarCliente(Number(req.params.id), req.body);
  if (!clienteAtualizado) return res.status(404).json({ erro: 'Cliente não encontrado' });
  res.json(clienteAtualizado);
}

function deletar(req, res) {
  const sucesso = clienteModel.deletarCliente(Number(req.params.id));
  if (!sucesso) return res.status(404).json({ erro: 'Cliente não encontrado' });
  res.status(204).send();
}

module.exports = {
  validarCliente,
  listar,
  buscar,
  criar,
  atualizar,
  deletar
};
