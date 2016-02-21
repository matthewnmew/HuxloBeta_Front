pc.script.create('picker_raycast', function (app) {
    // Creates a new PickerRaycast instance
    var PickerRaycast = function (entity) {
        this.entity = entity;
        
    };
    
    var pickedEntity;
    var first = true;
    var entitySelected = false;
    var objectMoveSelected = false;
    var objectRotateSelected = false;
    var moveableObject;
    var rotatingObject;
    var from = new pc.Vec3();
    var to = new pc.Vec3();
    var position = new pc.Vec3(0,0,25);
    var V0 = new pc.Vec3(0,0,0);
    var normal = new pc.Vec3(0,1,0);
    var rotateHandlePosition;
    var rotateHandlePositionOld;

    var objectStartAngle;
    var rotateHandle;
    var gridSize = 0.2;
    var angle = 0;
    var angleGrid = 10;
    var rotateSpeed = 0.5;



    PickerRaycast.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            app.mouse.on(pc.EVENT_MOUSEDOWN, this.onSelect, this);
            app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        },
        
        
        deleteEntity: function() {
            if(entitySelected === true){
                pickedEntity.destroy();
                first = true;
                entitySelected = false;
            }            
        },
        
        createEntity: function(newEntity) {
            if(entitySelected === true){
                pickedEntity.script.movement.release();
            }
            moveableObject = newEntity;
            objectMoveSelected = true;
            entitySelected = true;
            pickedEntity = newEntity;
            first = false;
            newEntity.script.movement.capture();
        },
        
        duplicateEntity: function() {
            if(entitySelected === true){
                pickedEntity.getParent().script.module_handler.createEntity(pickedEntity.getName());
            }            
        },

        onSelect: function (e) {
            
            if(objectMoveSelected === true){
                objectMoveSelected = false;
            }
            else if(objectRotateSelected === true){
                objectRotateSelected = false;
            }
            else {
                from = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.nearClip);
                to = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.farClip);

                app.systems.rigidbody.raycastFirst(from, to, function (result) {
                    if(result.entity.getName() === "Floor"){
                        if(first === false){
                        pickedEntity.script.movement.release();
                        entitySelected = false;
                        }
                    }
                    else if(result.entity.getName() === "grabHandle"){
                        objectMoveSelected = true;
                        moveableObject = result.entity.getParent();
                    }
                    else if(result.entity.getName() === "rotateHandle"){
                        objectRotateSelected = true;
                        rotateHandle = result.entity;
                        rotatingObject = result.entity.getParent();
                        rotateHandlePositionOld = result.entity.getPosition();
                    }
                    else {
                        if(first === false){
                        pickedEntity.script.movement.release();
                        entitySelected = false;
                        }
                        pickedEntity = result.entity;
                        pickedEntity.script.movement.capture();
                        entitySelected = true;
                        first = false;
                    }    
                });
            }
            
        },

        
        onMouseMove: function (e) {
                        
            if (app.mouse.isPressed(pc.MOUSEBUTTON_LEFT)) {
                if(objectMoveSelected === false && objectRotateSelected === false){
                    this.entity.script.Camera.horizontalScroll(e.dx);
                    this.entity.script.Camera.verticalScroll(e.dy);
                }
            }
            
            if(objectMoveSelected === true){
                from = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.nearClip);
                to = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.farClip);
                var V = to.sub(from);
                var t = (-(from.dot(normal)))/(V.dot(normal));
                var Vt = V.scale(t);
                position = from.add(Vt);
                position.x = Math.round(position.x/gridSize)*gridSize;
                position.y = Math.round(position.y/gridSize)*gridSize;
                position.z = Math.round(position.z/gridSize)*gridSize;
                moveableObject.setPosition(position);
            }
            if(objectRotateSelected === true){   
                angle = angle + e.dx*rotateSpeed;
                if(angle > angleGrid || angle < angleGrid){
                    angle = Math.round(angle/angleGrid)*angleGrid;
                    rotatingObject.rotateLocal(0,angle,0);
                    angle = 0;
                }
            }   
        },
        
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (app.keyboard.isPressed(pc.KEY_ENTER)) {
                    this.entity.script.picker_raycast.deleteEntity();
            }
            if (app.keyboard.isPressed(pc.KEY_SHIFT)) {
                    this.entity.script.picker_raycast.duplicateEntity();
            }
        }
    };

    return PickerRaycast;
});