'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Album', [{
      nome: 'Album 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Album 2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Album 3',

      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 4',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 5',

      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 6',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 7',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 8',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 9',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 10',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 11',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 12',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 13',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 14',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 15',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Album', null, {});
  }
};
