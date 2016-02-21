pc.script.create('module_handler', function (app) {
    // Creates a new Module_handler instance
    var Module_handler = function (entity) {
        this.entity = entity;
    };

    Module_handler.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
           
        },
        
        createEntity: function(entityName) {
           this.module = this.entity.findByName(entityName);
           var e = this.module.clone(); // Clone Entity
           this.entity.addChild(e); // Add it as a sibling to the original
           e.translate(0,0,9.2); // move to the side
           e.model.enabled = true;
           e.rigidbody.enabled = true;
           app.root.findByName("camera").script.picker_raycast.createEntity(e);
        },
        

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
          
            
        }
    };

    return Module_handler;
});