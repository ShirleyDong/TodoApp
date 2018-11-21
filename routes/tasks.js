var express = require('express');
var router = express.Router();

//connect to mongoDB
var mongojs = require('mongojs');
var db = mongojs('mongodb://Tianxia:todopass666@ds113454.mlab.com:13454/todo_list',['tasks']);


//get all data
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(err, tasks){
		if (err) {
			res.send(err);
		}
		res.json(tasks);
	});
});

//parse single task
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if (err) {
			res.send(err);
		}
		res.json(task);
	});
});

//Save task
router.post('/task', function(req, res, next){
	var task = req.body;
	if(!task.content || (task.isFinished + '')){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.save(task, function(err, task){
			if (err) {
				res.send(err);
			}
				res.json(task);
		});
	}


});

//detete the task
router.detete('/task/:id', function(req, res, next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if (err) {
			res.send(err);
		}
			res.json(task);
	});
});

//update the task
router.put('/task/:id', function(req, res, next){
	var task = req.body;
	var updTask = {};

	if(task.isFinished){
		updTask.isDone = task.isFinished;
	}

	if(task.content){
		updTask.content = task.content;
	}

	if(!updTask){
		res.status(400);
		res.json({
			"error":"Bad Data"
		});
	}else {

	db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
		if (err) {
			res.send(err);
		}
			res.json(task);
	});
}
});

module.exports = router;