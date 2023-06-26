'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Musicas', [{
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      artistaId: 1,
      albumId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      artistaId: 2,
      albumId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      artistaId: 3,
      albumId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      artistaId: 1,
      albumId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      genero: 'Portugal',
      dataLancamento: "22/06/2023",
      artistaId: 1,
      albumId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Musicas', null, {});
  }
};
