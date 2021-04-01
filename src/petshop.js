const moment = require('moment');
const fs = require('fs');
const app = require('.');

let bancoDados = fs.readFileSync('./database.json');
bancoDados = JSON.parse(bancoDados);

const petshop = {
  atualizarBanco: () => {
    let petsAtualizado = JSON.stringify(bancoDados);
    fs.writeFileSync('database.json', petsAtualizado, 'utf-8');
  },
  listarPets: () => {
    let textoListaPets = 'PETSHOP \n';
    bancoDados.pets.forEach((pet) => {
      textoListaPets += `${pet.nome}, ${pet.idade} anos, ${pet.tipo}, ${
        pet.raca
      }, ${pet.vacinado ? 'vacinado' : 'não vacinado'} \n`;

      pet.servicos.forEach((servico) => {
        textoListaPets += `${servico.data} - ${servico.nome}\n`;
      });
    });

    return textoListaPets;
  },
  vacinarPet: (pet) => {
    if (!pet.vacinado) {
      pet.vacinado = true;
      console.log(`${pet.nome} foi vacinado com sucesso`);
    } else {
      console.log(`Ops, ${pet.nome} já estava vacinado.`);
    }
    atualizarBanco();
  },
  campanhaVacina: () => {
    var petsVacinados = 0;

    bancoDados.pets.map((pet) => {
      if (!pet.vacinado) {
        vacinarPet(pet);
        petsVacinados++;
      }
      return pet;
    });

    console.log(
      `Foram vacinados ${petsVacinados} pets na campanha de vacinação`
    );
  },
  adicionarPet: (...novosPets) => {
    novosPets.forEach((novoPet) => {
      bancoDados.pets.push(novoPet);
    });

    novosPets.forEach((pet) => {
      console.log(`${pet.nome} foi adicionado com sucesso!`);
    });
  },
  darBanhoPet: (pet) => {
    pet.servicos.push({
      nome: 'dar banho',
      data: moment().format('DD-MM-YYYY'),
    });
    atualizarBanco();
    console.log(`${pet.nome} está de banho tomado`);
  },
  tosarPet: (pet) => {
    pet.servicos.push({
      nome: 'tosa',
      data: moment().format('DD-MM-YYYY'),
    });
    atualizarBanco();
    console.log(`${pet.nome} está com o cabelinho na régua`);
  },
  apararUnhasPet: (pet) => {
    pet.servicos.push({
      nome: 'aparar unhas',
      data: moment().format('DD-MM-YYYY'),
    });
    atualizarBanco();
    console.log(`${pet.nome} está de unhas aparadas`);
  },
  atenderCliente: (pet, servico) => {
    console.log(`Olá, ${pet.tutor}, os serviços realizados foram:`);
    servico ? servico(pet) : console.log('só vim dar uma olhadinha');
    console.log('Volte sempre!');
  },
  buscarPet: (nomePet) => {
    let foundPet = bancoDados.pets.find((pet) => {
      return pet.nome == nomePet;
    });
    return foundPet;
  },
  filtrarPet: (petEspecie) => {
    let petsEncontrados = bancoDados.pets.filter((pet) => {
      return pet.especie == petEspecie;
    });

    return petsEncontrados;
  },
  clientePremium: (pet) => {
    let { nome } = pet;
    let nServicos = pet.servicos.length;

    if (nServicos > 5) {
      console.log(
        `Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`
      );
    } else {
      console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
    }
  },
  contatoTutor: (pet) => {
    let { nome, tutor, contato } = pet;

    return `Tutor: ${tutor}
            Contato: ${contato}
            Pet: ${nome}`;
  },
  filtrarTutor: (nomeTutor) => {
    let petsTutor = bancoDados.pets.filter((pet) => {
      return pet.tutor == nomeTutor;
    });

    console.log(`Pets do tutor ${nomeTutor}:`);
    petsTutor.forEach((pet) => {
      console.log(`${pet.nome} - ${pet.tipo}`);
    });
  },
};

module.exports = petshop;
