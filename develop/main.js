'use strict';

function ticksToSleep(ticks) {
  return Game.time % ticks === 0;
}

require('./prototype.Creep');
require('./prototype.Room');
require('./prototype.RoomObject');
require('./prototype.StructureTower');

const creepController = require('./creep.controller');
const garbageCollector = require('./garbageCollector');
const harvestSourceAmount = require('./statistic.harvestSourceAmount');
const migration = require('./migration');
const roles = require('./creep.roles');
const roomController = require('./room.controller');

module.exports.loop = () => {
  migration(roles);
  if (ticksToSleep(100)) {
    garbageCollector.garbageCollect();
  }
  _.each(Game.creeps, creepController(roles));
  _.each(_.filter(Game.rooms, room => room.isMy()), roomController(roles, ticksToSleep));
  if (ticksToSleep(100)) {
    _.each(Game.rooms, room => {
      harvestSourceAmount.show(room);
      harvestSourceAmount.remove(room);
    });
  }
};
