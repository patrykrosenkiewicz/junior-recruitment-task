var app = (function(){
    var model = new taskModel(),
        view = new taskView(model),
        controller = new taskController(model, view);
})();