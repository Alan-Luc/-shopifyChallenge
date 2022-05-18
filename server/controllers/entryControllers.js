const Entry = require("../models/entryModel");

//inventory controllers
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Cannot be empty!"});
    }

    const entry = new Entry({
        itemName: req.body.itemName,
        stock: req.body.stock,
        packages: req.body.packages,
        orders: req.body.orders,
    });

    Entry.create(entry, (err, callback) => {
        if(err) {
            res.status(500).send({message: err.message})
        }
        else {
            console.log("entry successfully created!")
            res.send(callback)
        }
    })
};

exports.getAll = (req, res) => {
    Entry.getAll((err, callback) => {
        if(err) {
            res.status(500).send({message: err.message})
        }
        else res.send(callback);
    })
};

exports.getById = (req, res) => {
    Entry.getById(req.params.id, (err, callback) => {
        if(err) {
            if(err.type === "DNE") {
                res.status(404).send({
                    message: `entry with id ${req.params.id} does not exist`
                })
            }
            else res.status(500).send({message: err.message})
        }
        else res.send(callback)
    })
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Cannot be empty!"});
    }
    console.log(req.body)
    Entry.update(req.params.id, new Entry(req.body), (err, callback) => {
        if(err) {
            if(err.type === "DNE") {
                res.status(404).send({
                    message: `entry with id ${req.params.id} does not exist`
                })   
            }
            else res.status(500).send({message: err.message})
        }
        else {
            console.log("entry successfully updated!")
            res.send(callback)
        }
    })
};

exports.deleteById = (req, res) => {
    Entry.deleteById(req.params.id, (err, callback) => {
        if(err) {
            if(err.type === "DNE") {
                res.status(404).send({
                    message: `entry with id ${req.params.id} does not exist`
                })   
            }
            else res.status(500).send({message: err.message})
        }
        else {
            console.log("entry successfully deleted!")
            res.send(callback)
        } 
    })
};

exports.deleteAll = (req, res) => {
    Entry.deleteAll((err, callback) => {
        if(err) {
            res.status(500).send({message: err.message})
        }
        else res.send("all entries deleted")
    })
};

//trash route controllers
exports.trash = (req, res) => {
    Entry.trash(req.params.id, req.body.comments, (err, callback) => {
        console.log("comment", req.body.comments)
        if(err) {
            if(err.type === "DNE") {
                res.status(404).send({
                    message: `entry with id ${req.params.id} does not exist`
                })   
            }
            else res.status(500).send({message: err.message})
        }
        else {
            console.log("entry successfully trashed!")
            res.send(callback)
        }
    })
};

exports.undoTrash = (req, res) => {
    Entry.undoTrash(req.params.id, (err, callback) => {
        console.log(req.params.id)
        if(err) {
            if(err.type === "DNE") {
                res.status(404).send({
                    message: `entry with id ${req.params.id} does not exist`
                })   
            }
            else res.status(500).send({message: err.message})
        }
        else {
            console.log("entry successfully undeleted!")
            res.send(callback)
        }
    })
};

exports.viewTrash = (req, res) => {
    Entry.viewTrash((err, callback) => {
        if(err) {
            res.status(500).send({message: err.message})
        }
        else res.send(callback);
    })
};

exports.viewTrashById = (req, res) => {
    Entry.viewTrashById(req.params.id, (err, callback) => {
        if(err) {
            if(err.type === "DNE") {
                res.status(404).send({
                    message: `entry with id ${req.params.id} does not exist`
                })
            }
            else res.status(500).send({message: err.message})
        }
        else res.send(callback)
    })
};