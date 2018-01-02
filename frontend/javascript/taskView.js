/**
 * Creates a new view which display all the tasks
 * @constructor
 *@param {object} have a model object
 */
var taskView = function(model){
    this.model = model;
    this.addTaskEvent = new Event(this);
    this.completeTaskEvent = new Event(this);
    this.deleteTaskEvent = new Event(this);

    this.init();
};

taskView.prototype = {
    /**
     * call needed functions to work correctly
     */
    init: function(){
        this.cacheDom()
        this.handlers()
        this.enable()
    },

    /**
     * Caches the dom and return an object itself
     */

    cacheDom: function () {
        this.$toDoList = document.getElementById('toDoList');
        this.$addTask = document.getElementById('add-task');
        this.$taskBody = document.getElementById('task-item');


        return this;
    },

    /**
     * creates a handlers for events
     */

    handlers: function(){
        this.addTaskButtonHandler = this.addTaskButton.bind(this);
        this.completeButtonHandler = this.completeTaskButton.bind(this);
        this.deleteButtonHandler = this.deleteTaskButton.bind(this);




        this.addTaskHandler = this.addTask.bind(this);
        this.completeTaskHandler = this.completeTask.bind(this);
        this.deleteTaskHandler = this.deleteTask.bind(this);

        return this;
    },

    /**
     * creates all the event listeners
     */

    enable: function(){
        this.$addTask.addEventListener('submit', function(e){
            e.preventDefault();
            this.addTaskButtonHandler();
        }.bind(this));

        this.$toDoList.addEventListener('click', function (e) {
           if(e.target.className === "complete-button"){
               var listNodes = this.$toDoList.childNodes;

               var arrayNodes = Array.prototype.slice.call(listNodes, 0);

                var child = e.target.parentElement;

                this.checked = arrayNodes.reverse().indexOf(child);
               this.completeButtonHandler();

           }
        }.bind(this));

        this.$toDoList.addEventListener('click', function (e) {
            if(e.target.className === "delete-button"){


                var listNodes = this.$toDoList.childNodes;

                var arrayNodes = Array.prototype.slice.call(listNodes, 0);


                var child = e.target.parentElement;

                this.deleted = arrayNodes.reverse().indexOf(child);;
                this.deleteButtonHandler();

            }
        }.bind(this));




        this.model.addTaskEvent.attach(this.addTaskHandler);
        this.model.completeTaskEvent.attach(this.completeTaskHandler);
        this.model.deleteTaskEvent.attach(this.deleteTaskHandler)

        return this;
    },

    /**
     * callback when the task is sended
     */

    addTaskButton: function() {

        if(this.$taskBody.value){
            this.addTaskEvent.notify({
                task: this.$taskBody.value
            })
        }else{
            alert("Task title cannot be empty");
        }

    },

    /**
     * calls a build list method
     */


    show: function () {
        this.buildList();
    },

    /**
     * builds a list with all the tasks
     */

    buildList: function () {
        var tasks = this.model.getTasks();
        this.$toDoList.innerHTML = "";
        for(var task in tasks){
            var li = document.createElement('li');
            li.className = 'task';
            if(tasks[task].taskStatus === "completed"){
                li.innerHTML = '<input type="checkbox" class="complete-button" checked><p class="task-body" id="checked">' + tasks[task].taskName + '</p> <button class="delete-button"></button>';
            } else {
                li.innerHTML = '<input type="checkbox" class="complete-button"><p class="task-body">' + tasks[task].taskName + '</p> <button class="delete-button"></button>';
            }
            this.$toDoList.insertBefore(li, this.$toDoList.childNodes[0]);
            this.$taskBody.value = '';


        }
    },

    /**
     * after adding a task calls a show method which calls build list after
     */
    addTask: function(){
        this.show();
    },
    /**
     * notifies mdoel that the tasks get checked
     */
    completeTaskButton: function(){
        this.completeTaskEvent.notify(this.checked);
    },

    /**
     * calls show method when task get selected
     */
    completeTask: function(){
        this.show();
    },

    /**
     * notifies a model when delete button was used
     */
    deleteTaskButton: function(){
        this.deleteTaskEvent.notify(this.deleted);
    },

    /**
     * after removing a task calls show method
     */
    deleteTask: function(){
        this.show();
    },

};
