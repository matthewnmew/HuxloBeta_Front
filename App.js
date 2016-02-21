var app = pc.Application.getApplication("application-canvas");

function deleteModule() {
    var entity = app.root.findByName("camera");
    entity.script.picker_raycast.deleteEntity();
}

function duplicateModule() {
    var entity = app.root.findByName("camera");
    entity.script.picker_raycast.duplicateEntity();
}

function loadModule(entityName) {
    var entity = app.root.findByName("modules");
    entity.script.module_handler.createEntity(entityName);
}

function ZoomIn() {
    var entity = app.root.findByName("camera");
    entity.script.Camera.zoomIn();
}

function ZoomOut() {
    var entity = app.root.findByName("camera");
    entity.script.Camera.zoomOut();
}
