const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Company } = require('../models/company');

// => localhost:4000/companies
router.get('/' , (req, res) => {
    Company.find((err, docs) => {
        if (!err) { res.send(docs);}
        else {console.log('Error in Retriving Companies:' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
         return res.status(400).send('No record with given id :${req.params.id}');

    Company.findById(req.params.id, (err, doc) => {
        if(!err) {req.send(doc);}
        else {console.log('Error in Retriving Company:' + JSON.stringify(err, undefined, 2));}
    });     
});

router.post('/' , (req, res) => {
    var comp = new Company({
        name: req.body.name,
        code: req.body.code,
        location: req.body.location
    });
    comp.save((err,doc) => {
        if(!err) { res.send(doc); }
        else {console.log('Error in  Company Save :' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var comp = {
        name: req.body.name,
        code: req.body.code,
        location: req.body.location
    };
    Company.findByIdAndUpdate(req.params.id, { $set: comp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Company Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Company.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Company Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;