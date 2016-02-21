pc.script.attribute("materials", "asset", [], {type: "material"});

pc.script.create('axis_creator', function (app) {
    // Creates a new Axis_creator instance
    var Axis_creator = function (entity) {
        this.entity = entity;
    };
    

    Axis_creator.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
           
           this.xMaterial = app.assets.getAssetById(this.materials[0]).resource;
           this.zMaterial = app.assets.getAssetById(this.materials[1]).resource;
           
           
            
           var e = new pc.Entity(); // Create an Entity
           e.addComponent("model", {type: 'cylinder'});   
           this.entity.insertChild(e, 0); // Add it to the Entity hierarchy
           e.rotate(0,0,90);    
           //e.translate(0,1,0);
           e.setLocalScale(0.05,500,0.05);
           e.model.enabled = false;
           e.model.model.meshInstances[0].material = this.xMaterial;
            
           e = new pc.Entity(); // Create an Entity
           e.addComponent("model", {type: 'cylinder'});   
           this.entity.insertChild(e, 1); // Add it to the Entity hierarchy
           e.rotate(90,0,0);
           //e.translate(0,1,0);
           e.setLocalScale(0.05,500,0.05);         
           e.model.enabled = false;
            e.model.model.meshInstances[0].material = this.zMaterial;
        },
        
        
       

        createAxis: function() {
           for(i = 0; i < 2; i++){
                var child = this.entity.getChildren()[i];
                child.model.enabled = true;
            }
        },
       
        
        destroyAxis: function() {
            for(i = 0; i < 2; i++){
                var child = this.entity.getChildren()[i];
                child.model.enabled = false;
            }
            
            
            
               
        },
        

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Axis_creator;
});