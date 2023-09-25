import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'react-dropdown/style.css';
import { Industries, filteredRecords, getSortedByIndustry } from "./sort.js"
import { getAllRecords, getSortedRecords, searchRecords } from "../api/records.js";



//table body for industries
const Record = (props) => (


    <tr>
        <td>{props.record.name}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}/industriesDB`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteRecord(props.record._id, "industriesDB");
                }}
            >
                Delete
            </button>
        </td>
    </tr>

);

//table body for iot
const IotRecord = (props) => (

    <tr>
        <td>{props.iotRecord.DeviceName}</td>
        <td>{new Date(props.iotRecord.wAdditionTime).toISOString()}</td>
        <td>{props.iotRecord.fee}</td>
        <td>{props.iotRecord.Industry}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.iotRecord._id}/iotDB`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteRecord(props.iotRecord._id, "iotDB");
                }}
            >
                Delete
            </button>
        </td>
    </tr>

);



export default function RecordList() {
    const [records, setRecords] = useState([]);
    const [iotRecords, setIotRecords] = useState([]);

    const [searchForm, setSearchForm] = useState({
        table: "",
        name: "",
    });


    // get tables for iot and industries
    useEffect(() => {
        async function getRecords(table) {
            getAllRecords(table);

            if (table == "iotDB") {
                let iotRecords = await getAllRecords(table);
                setIotRecords(iotRecords);
            }
            else if (table == "industriesDB") {
                let records = await getAllRecords(table);
                setRecords(records);
            }

        }
        getRecords("iotDB");
        getRecords("industriesDB");




        return;
    }, [records.length]);

    //sorts the given table by the field and order provided
    async function sort(table, field, order) {

        let records = await getSortedRecords(table, field, order);
        if (table == "industriesDB") {
            setRecords(records);

        }
        else if (table == "iotDB") {
            setIotRecords(records);

        }

    }
    //handles the search functionality by fiding (on the given table) the record given its name or DeviceName
    async function handleSearch() {
       
        if (searchForm.table == "iotDB") {
            let records = await searchRecords(searchForm, "DeviceName");
            setIotRecords(records);
        }
        else if (searchForm.table == "industriesDB") {
            let records = await searchRecords(searchForm, "name");
            setRecords(records);
        }

    }

    // Delete a record given its id and table
    async function deleteRecord(id, table) {
        await fetch(`http://localhost:5050/record/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ table: table, id: id }),
        });


        if (table == "industriesDB") {
            const newRecords = records.filter((el) => el._id !== id);
            setRecords(newRecords);

        }
        else if (table == "iotDB") {
            const newRecords = iotRecords.filter((el) => el._id !== id);
            setIotRecords(newRecords);

        }
    }

    // map the industry records
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id, "industriesDB")}
                    key={record._id}
                />
            );
        });
    }
    //map the iot records
    function iotRecordList() {
        return iotRecords.map((iotRecord) => {
            return (
                <IotRecord
                    iotRecord={iotRecord}
                    deleteRecord={() => deleteRecord(iotRecord._id, "iotDB")}
                    key={iotRecord._id}
                />
            );
        });
    }
    //filters the iot records given industry
    async function filter() {
        await getSortedByIndustry();
        await setIotRecords(filteredRecords);
    }


    // render the tables
    return (

        <div>
            <div>
                <h3>Search</h3>
                <select onChange={(e) => setSearchForm({ table: e.target.value, name: searchForm.name })} name="table" >
                    <option value="industriesDB">Industries</option>
                    <option value="iotDB">IoT</option>
                </select>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={(e) => setSearchForm({ table: searchForm.table, name: e.target.value })}
                    />
                </div>

                <button className="form-group"
                    onClick={() => {
                        handleSearch();
                    }}
                >
                    Search
                </button>
            </div>



            <h3>Industries List</h3>
            <button className="btn btn-link" onClick={() => {
                sort("industriesDB", "name", 1);
            }}>sort</button>

            <table data={records} className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
            <h3>IoT List</h3>
            <Industries></Industries>
            <button type="button" onClick={filter}>Filter</button>
            <button className="btn btn-link" onClick={() => {
                sort("iotDB", "DeviceName", 1);
            }}>sort</button>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Device Name</th>
                        <th>Addition Time</th>
                        <th>Fee</th>
                        <th>Industry</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{iotRecordList()}</tbody>
            </table>
        </div>
    );
}
