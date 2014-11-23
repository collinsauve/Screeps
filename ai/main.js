var _ = require('lodash'), healer = require('healer'), findAttack = require('findAttack');
for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    if (creep.getActiveBodyparts('heal') > 0) {
        healer(creep);
    } else if (/Defend/.test(creep.name)) {
        findAttack(Game.creeps[i], false, true);
    } else if (/Siege/.test(creep.name)) {
        findAttack(Game.creeps[i], true);
    } else {
        findAttack(Game.creeps[i], false);
    }
}