const db = require("./dbSetup");

const Entry = function(entry) {
    this.itemName = entry.itemName
    this.stock = entry.stock
    this.packages = entry.packages
    this.orders = entry.orders
    this.comments = null
    this.archived = false
};

//inventory functions
Entry.create = (entryObj, callback) => {
    db.query("INSERT INTO inventory SET ?", entryObj,
        (err, res) => {
            if (err) {
                console.log("error ", err);
                return;
            }
            console.log({id: res.insertId, ...entryObj})
            callback(null, {id: res.insertId, ...entryObj})
    });
};

Entry.getAll = (callback) => {
    db.query("SELECT id, itemName, stock, packages, orders FROM inventory WHERE archived = false",
        (err, res) => {
            if (err) {
                console.log("error ", err);
                return;
            }
            console.log(res)
            callback(null, res)
    });
};

Entry.getById = (id, callback) => {
    db.query("SELECT id, itemName, stock, packages, orders FROM inventory WHERE archived = false and id = ?", [id],
        (err, res) => {
            if (err) {
                console.log("error", err);
                return;
            }
            if (res.length > 0) {
                console.log(res);
                callback(null, res[0]);
                return;
            }
            callback({type: "DNE"}, null)
    });
};

Entry.update = (id, entryObj, callback) => {
    db.query(
        "UPDATE inventory SET itemName = ?, stock = ?, packages = ?, orders = ? WHERE id = ?",
        [entryObj.itemName, entryObj.stock, entryObj.packages, entryObj.orders, id],
        (err, res) => {
            if(err) {
                console.log("error", err);
                return
            }
            if (res.affectedRows === 0) {
                callback({type: "DNE"}, null);
                return;
            } 
            console.log({id: id, ...entryObj})
            callback(null, {id: id, ...entryObj})
    })
};

Entry.deleteById = (id, callback) => {
    db.query("DELETE FROM inventory WHERE archived = true AND id = ?", [id],
        (err, res) => {
            if(err) {
                console.log("error", err);
                return
            }
            if (res.affectedRows === 0) {
                callback({type: "DNE"}, null);
                return;
            }
            callback(null, res)
    })
};

Entry.deleteAll = (callback) => {
    db.query("DELETE FROM inventory WHERE archived = true",
        (err, res) => {
            if(err) {
                console.log("error", err);
                return;
            }
            console.log(`${res.affectedRows} entries were deleted`)
            callback(null, res)
    })
    db.query("ALTER TABLE inventory auto_increment = 1",
        (err, res) => {
            if(err) {
                console.log("error", err);
                return;
            }
    })
};

//trash functions
Entry.trash = (id, comment, callback) => {
    db.query("UPDATE inventory SET comments = ?, archived = true WHERE id = ?", [comment, id], 
        (err, res) => {
            if(err) {
                console.log("error", err);
                return
            }
            if (res.affectedRows === 0) {
                callback({type: "DNE"}, null);
                return;
            } 
            console.log("entry moved into the trash", res)
            callback(null, res)
    })
};

Entry.undoTrash = (id, callback) => {
    db.query("UPDATE inventory SET comments = null, archived = false WHERE id = ?", [id], 
        (err, res) => {
            if(err) {
                console.log("error", err);
                return
            }
            if (res.affectedRows === 0) {
                callback({type: "DNE"}, null);
                return;
            } 
            console.log("entry undeleted", res)
            callback(null, res)
    })
};

Entry.viewTrash = (callback) => {
    db.query("SELECT id, itemName, comments FROM inventory WHERE archived = true",
        (err, res) => {
            if (err) {
                console.log("error ", err);
                return;
            }
            console.log(res)
            callback(null, res)
    });
};

Entry.viewTrashById = (id, callback) => {
    db.query("SELECT id, itemName, comments FROM inventory WHERE archived = true AND id = ?", [id],
        (err, res) => {
            if (err) {
                console.log("error", err);
                return;
            }
            if (res?.length > 0) {
                console.log(res);
                callback(null, res[0]);
                return;
            }
            callback({type: "DNE"}, null)
    });
};

module.exports = Entry;