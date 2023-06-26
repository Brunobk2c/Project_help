'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Album', [{
      nome: 'Album 1',
      artistaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Album 2',
      artistaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Album 3',
      artistaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 4',
      artistaId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 5',
      artistaId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 6',
      artistaId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 7',
      artistaId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 8',
      artistaId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 9',
      artistaId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 10',
      artistaId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 11',
      artistaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 12',
      artistaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 13',
      artistaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 14',
      artistaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nome: 'Album 15',
      artistaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Album', null, {});
  }
};
