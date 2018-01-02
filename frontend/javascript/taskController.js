/**
 * creates a new controller instance which is a bridge between model and a view
 * @param {object} binds with the model object
 * @param {object} binds with the view object
 */

var taskController = function(model, view){

    this.model = model;
    this.view = view;

    this.init();
};

taskController.prototype = {

    /**
     * call needed functions to work correctly
     */
    init: function(){
      this.handlers()
      this.enable()
    },


    /**
     * creates a handlers for events
     */
    handlers: function(){
        this.addTaskHandler = this.addTask.bind(this);
        this.completeTaskHandler = this.completeTask.bind(this);
        this.deleteTaskHandler = this.deleteTask.bind(this);
        return this;

    },

    /**
     * attach all the events to the Event.js object
     */
    enable: function(){
        this.view.addTaskEvent.attach(this.addTaskHandler);
        this.view.completeTaskEvent.attach(this.completeTaskHandler);
        this.view.deleteTaskEvent.attach(this.deleteTaskHandler);
        return this;
    },

    /**
     * calls model addTask method
     * @param {object} object of a view
     * @param {array}
     */
    addTask: function (sender, args) {
        this.model.addTask(args.task);
    },

    /**
     * calls the models complete task method
     * @param {object}
     * @param {number} index of a completed task
     */
    completeTask: function (sender, args){
        this.model.completeTask(args);
    },


    /**
     * calls the models delete task method
     * @param {object}
     * @param {number} index of a task to remove
     */
    deleteTask: function(sender, args){
        this.model.deleteTask(args);
    }
};