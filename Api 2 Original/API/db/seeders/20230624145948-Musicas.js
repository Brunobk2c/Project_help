'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Musicas', [{
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Musicas', null, {});
  }
};
