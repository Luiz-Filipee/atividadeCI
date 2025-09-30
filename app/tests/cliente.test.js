const request = require('supertest');
const app = require('../src/app');
const clienteModel = require('../src/models/clienteModel');

describe('API de Clientes', () => {
  beforeEach(() => {
    clienteModel.resetarDados(); // Limpa dados entre testes
  });

  it('deve criar um cliente', async () => {
    const res = await request(app)
      .post('/clientes')
      .send({ nome: 'João', email: 'joao@email.com', telefone: '11999999999' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('João');
  });

  it('deve listar os clientes', async () => {
    await request(app)
      .post('/clientes')
      .send({ nome: 'Maria', email: 'maria@email.com', telefone: '11988888888' });

    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve retornar erro ao criar cliente inválido', async () => {
    const res = await request(app).post('/clientes').send({ nome: '', email: 'emailinvalido', telefone: '123' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve atualizar um cliente existente', async () => {
    const cliente = await request(app)
      .post('/clientes')
      .send({ nome: 'Ana', email: 'ana@email.com', telefone: '11977777777' });

    const res = await request(app)
      .put(`/clientes/${cliente.body.id}`)
      .send({ nome: 'Ana Paula', email: 'ana@email.com', telefone: '11977777777' });

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Ana Paula');
  });

  it('deve deletar um cliente', async () => {
    const cliente = await request(app)
      .post('/clientes')
      .send({ nome: 'Carlos', email: 'carlos@email.com', telefone: '11966666666' });

    const res = await request(app).delete(`/clientes/${cliente.body.id}`);
    expect(res.statusCode).toBe(204);
  });
});
