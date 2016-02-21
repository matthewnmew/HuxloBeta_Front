pc.script.attribute("materials", "asset", [], {type: "material"});



// Script Definition
pc.script.create('movement', function (app) {
    
    // Creates a new Movement instance
    var Movement = function (entity) {
        this.entity = entity;
        this.pos = new pc.Vec3();
        this.pos = this.entity.getPosition();
        //this.first = true;
    };
    
    this.IsEntitySelected = false;

    Movement.prototype = {        
        
        initialize: function () {
            this.notSelectedMaterial = app.assets.getAssetById(this.materials[0]).resource;
            this.selectedMaterial = app.assets.getAssetById(this.materials[1]).resource;
            this.entity.model.enabled = false;
            this.entity.rigidbody.enabled = false;
            this.XAxis = this.entity.findByName('XAxis');
            this.YAxis = this.entity.findByName('YAxis');
            this.grabHandle = this.entity.findByName('grabHandle');
            this.rotateHandle = this.entity.findByName('rotateHandle');
            this.XAxis.model.enabled = false;
            this.YAxis.model.enabled = false;
            this.grabHandle.model.enabled = false;
            this.grabHandle.rigidbody.enabled = false;
            this.rotateHandle.model.enabled = false;
            this.rotateHandle.rigidbody.enabled = false;
            
        },
        
        capture: function() {
            this.first = false;
            this.XAxis = this.entity.findByName('XAxis');
            this.YAxis = this.entity.findByName('YAxis');
            this.grabHandle = this.entity.findByName('grabHandle');
            this.rotateHandle = this.entity.findByName('rotateHandle');
            
            this.IsEntitySelected = true;
            this.entity.model.model.meshInstances[0].material = this.selectedMaterial;
            this.XAxis.model.enabled = true;
            this.YAxis.model.enabled = true;
            this.grabHandle.model.enabled = true;
            this.grabHandle.rigidbody.enabled = true;
            this.rotateHandle.model.enabled = true;
            this.rotateHandle.rigidbody.enabled = true;
        },
        
        release: function() {
            
            this.XAxis = this.entity.findByName('XAxis');
            this.YAxis = this.entity.findByName('YAxis');
            this.grabHandle = this.entity.findByName('grabHandle');
            this.rotateHandle = this.entity.findByName('rotateHandle');
            
            this.IsEntitySelected = false;
            this.entity.model.model.meshInstances[0].material = this.notSelectedMaterial;
            this.XAxis.model.enabled = false;
            this.YAxis.model.enabled = false;
            this.grabHandle.model.enabled = false;
            this.grabHandle.rigidbody.enabled = false;
            this.rotateHandle.model.enabled = false;    
            this.rotateHandle.rigidbody.enabled = false;
        },
        
        
        update: function (dt) {
            //if(this.first === true){
                
              //  this.first = false;
            //}
            
        }
    };

    return Movement;
});