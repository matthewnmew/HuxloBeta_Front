pc.script.create('Camera', function (context) {
    // Creates a new Camera instance
    var Camera = function (entity) {
        this.entity = entity;

        this.distance = 50;
        this.height = 20;
        this.orbitAngle = 20;
    };
    
    var scrollSpeed = 0.1;
    var zoomSpeed = 2;

    Camera.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {

            var cameraEntity = this.entity;
            var sphereEntity = context.root.findByName('Floor');

        },
        
        zoomIn: function () {
            this.distance = this.distance - 2;
        },
        
        zoomOut: function () {
            this.distance = this.distance + 2;
        },
        
        horizontalScroll: function (scroll) {
            this.orbitAngle = this.orbitAngle - (scroll*scrollSpeed);
        },
        
        verticalScroll: function (scroll) {
            if (this.height - (scroll*scrollSpeed) > 1) {
                this.height = this.height - (scroll*scrollSpeed);
            }
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {            
            
            var cameraEntity = this.entity;
            var sphereEntity = context.root.findByName('Floor');

            // Step 1: Place the camera where the sphere is
            cameraEntity.setPosition(sphereEntity.getPosition());

            // Step 2: Rotate the ball around the world Y (up) axis by some stored angle
            cameraEntity.setEulerAngles(0, this.orbitAngle, 0);

            // Step 3: Move the camera backwards by some 'distance' and up by some 'height'
            // Note that a camera looks down its negative Z local axis. So if this.distance
            // is a positive number, it will move backwards.
            cameraEntity.translateLocal(0, this.height, this.distance);

            // Step 4: Look at the ball from the camera's new position
            cameraEntity.lookAt(sphereEntity.getPosition());        }
    };

    return Camera;
});