'use strict';

const body = require('util.body');

module.exports.conditions = room => {
  return room.controller.level >= 4 &&
         room.energyCapacityAvailable >= 1300 &&
         room
           .find(FIND_STRUCTURES, {
             filter: structure => structure.structureType == STRUCTURE_STORAGE
           })
           .length > 0;
};

module.exports.priorities = [
  {
    role: 'harvestSource-upgradeController',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'harvestSource-transferEnergyStorage',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 8 })
  },
  {
    role: 'harvestEnergyStorage-transferStructure',
    amount: 1,
    body: body({ carry: 8, move: 8 })
  },
  {
    role: 'harvestEnergyStorage-buildConstructionSite',
    amount: 1,
    body: body({ carry: 4, move: 4, work: 4 })
  }
];