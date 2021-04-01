const express = require('express');
const petshop = require('./petshop');
const app = express();
app.use(express.json());

app.post('/pets', (request, response) => {
  const { nome, tipo, idade, raca, peso, tutor, contato } = request.body;

  const pet = {
    nome,
    tipo,
    idade,
    raca,
    peso,
    tutor,
    contato,
    vacinado: false,
    servicos: [],
  };

  petshop.adicionarPet(pet);

  return response.json(pet);
});

app.get('/pets/:nome', (request, response) => {
  const { nome } = request.params;
  const findPet = petshop.buscarPet(nome);

  if (!findPet) {
    return response.status(404).json({ error: 'Pet not found' });
  }

  return response.json(findPet);
});

module.exports = app;
