'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');
var memoryObject = require('./util.memoryObject');

function find(creep) {
  var sources = creep.room.find(FIND_SOURCES);
  if (sources.length === 0) {
    creep.error('missing source');
    return;
  }
  sources = _.sortBy(sources,
    source => {
      var creeps = creep.room.find(FIND_MY_CREEPS, {
        filter: creep => creep.memory.source === source.id
      });
      return creeps.length / harvestSourcePositions.getAmountBySource(source);
    }
  );
  return sources[0];
}

module.exports = (next, harvest) => creep => {
  if (creep.isFull()) {
    return next;
  }
  var source = memoryObject(creep, 'harvestSource', find);
  if (!source || source.energy === 0) {
    return harvest;
  }
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
};
