const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

// => localhost:4000/employees
router.get('/' , (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs);}
        else {console.log('Error in Retriving Employees:' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
         return res.status(400).send('No record with given id :${req.params.id}');

    Employee.findById(req.params.id, (err, doc) => {
        if(!err) {req.send(doc);}
        else {console.log('Error in Retriving Employee:' + JSON.stringify(err, undefined, 2));}
    });     
});

router.post('/' , (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        department: req.body.department,
        role:req.body.role
    });
    emp.save((err,doc) => {
        if(!err) { res.send(doc); }
        else {console.log('Error in  Employee Save :' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        department: req.body.department,
        role:req.body.role
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employeee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;