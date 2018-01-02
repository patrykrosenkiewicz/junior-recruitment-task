/**
 * Creates a new model
 * @constructor
 *
 */


var taskModel = function(){
    this.tasks = [];
    this.addTaskEvent = new Event(this);
    this.completeTaskEvent = new Event(this);
    this.deleteTaskEvent = new Event(this);

};

taskModel.prototype = {

    /**
     * Adds task to the task array and notifies taskView
     * @param {string|number}
     * @param {string} [status = uncompleted]
     *
     */

    addTask: function(task, status = 'uncompleted'){
        this.tasks.push({
            taskName: task,
            taskStatus: status
        });
        this.addTaskEvent.notify();
    },

    /**
     * Simply returns array of tasks
     */

    getTasks: function(){
        return this.tasks;
    },

    /**
     * sets the task status to the completed
     * @param {number} index of a task
     */

    completeTask: function(args){

        if(this.tasks[args].taskStatus === 'completed'){
            this.tasks[args].taskStatus = 'uncompleted';
        } else{
            this.tasks[args].taskStatus = 'completed';
        }
        this.completeTaskEvent.notify();
    },

    /**
     * remove task from the task array
     * @param {number} index of a task
     */

    deleteTask: function(args) {

        this.tasks.splice(args, 1);

        this.deleteTaskEvent.notify();
    }
};