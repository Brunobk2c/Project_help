'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artista', [{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'John',
      pais: 'Portugal',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artista', null, {});
  }
};
