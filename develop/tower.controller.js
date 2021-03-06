'use strict';

module.exports = tower => {
  if (tower.isEmpty()) {
    return;
  }
  if (tower.attackHostileCreep()) {
    return;
  }
  if (tower.rescueRampart()) {
    return;
  }
  if (tower.isFull({ percentage: 0.5 })) {
    if (tower.repairStructure()) {
      return;
    }
  }
  if (tower.isFull({ percentage: 0.75 })
      &&
      (tower.room.storage && tower.room.storage.isFull({ percentage: 0.75 }))) {
    if (tower.repairWall()) {
      return;
    }
  }
};
