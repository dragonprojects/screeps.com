'use strict';

module.exports = roles => creep => {
  if (creep.spawning) {
    return;
  }
  var role = roles[creep.memory.role];
  if (!role) {
    creep.error('unknown role', { role: creep.memory.role });
    return;
  }
  var activity = role.activities[creep.memory.activity];
  if (!activity) {
    creep.error('unknown activity', { activity: creep.memory.activity, role: creep.memory.role });
    return;
  }
  creep.memory.activity = activity(creep) || creep.memory.activity;
};
