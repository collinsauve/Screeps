module.exports = (function () {

    function upgradeController(actor) {

        var controller = actor.room.controller;
        if (controller == undefined || controller === null) {
            return false;
        }

        action.specifc(actor, controller, 'upgrading controller', () => {
            //TODO: Structures can't move
            actor.moveTo(controller);
            actor.upgradeController(controller);
        });
        return true;
    }

    function resetControllerDowngrade(actor) {
        var controller = actor.room.controller;
        //TODO: Make this so it is dynamic based on controller level
        //TODO: Find and assign a single builder to upgrade the controller.  
        //      This will currently send all builders over to the controller to upgrade it.
        if (controller !== undefined && controller !== null && controller.ticksToDowngrade < 4000) {
            action.specific(actor, controller, 'reset controller', () => {
                //TODO: Structures can't move
                actor.moveTo(controller);
                actor.upgradeController(controller);
            });
            return true;
        }
        return false;
    }

    return {
        upgradeController,
        resetControllerDowngrade
    };
}());