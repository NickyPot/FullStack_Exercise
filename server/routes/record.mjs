import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all records based on what table is requested
router.post("/table", async (req, res) => {
    console.log("gsadf");
    let collection = await db.collection(req.body.table);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// get sorted records based on what table, field and order is requested
router.post("/sort", async (req, res) => {
    let collection = await db.collection(req.body.table);
    var sort = { };
    sort[req.body.field] = req.body.order
    let results = await collection.find({}).sort(sort).toArray();
    res.send(results).status(200);
});

// search on given table for given field and value
router.post("/search", async (req, res) => {
    let collection = await db.collection(req.body.table);
    let query = {  };
    query[req.body.field] = req.body.value
    let results = await collection.find(query).toArray();
    if (!results) res.send("Not found").status(404);
    else res.send(results).status(200);
});

// get a specific record, given its id and table
router.post("/tableid", async (req, res) => {
    let collection = await db.collection(req.body.table);
    let query = { _id: new ObjectId(req.body.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// create a record, given table and values
router.post("/create", async (req, res) => {
    let newRecord = {};
    //create new record based on what table it is being put in
    if(req.body.table == "industriesDB"){
        newRecord = {
            name: req.body.name,
        };
    }
    else if (req.body.table == "iotDB") {
        newRecord = {
            DeviceName: req.body.DeviceName,
            wAdditionTime: req.body.wAdditionTime,
            fee: req.body.fee,
            Industry: req.body.Industry
        };
    }
    let collection = await db.collection(req.body.table);
    let result = await collection.insertOne(newRecord);
    res.send(result).status(204);
});


// Update record given table and data
router.post("/edit", async (req, res) => {
    console.log(req.body);
    console.log(req.body.id)
    const query = { _id: new ObjectId(req.body.id) };
    let update = {};

    //set body update based on what table is being updated (needs different fields)
    if (req.body.table == "industriesDB" ){
        update = {
            $set: {
                name: req.body.name,
            }
        };
    }
    else if (req.body.table == "iotDB") {
        update = {
            $set: {
                DeviceName: req.body.DeviceName,
                wAdditionTime: req.body.wAdditionTime,
                fee: req.body.fee,
                Industry: req.body.Industry
            }
        };
    }

    let collection = await db.collection(req.body.table);
    let result = await collection.updateOne(query, update);

    res.send(result).status(200);
});

// Delete recrod given id and table
router.delete("/delete", async (req, res) => {
    const query = { _id: new ObjectId(req.body.id) };
    console.log(new ObjectId(req.body.id));
    console.log(JSON.stringify(new ObjectId(req.body.id)))


    const collection = db.collection(req.body.table);
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;