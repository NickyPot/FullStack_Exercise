import React, { useEffect, useState, Component } from "react";
import { getAllRecords, searchRecords } from "../api/records.js";

export let filteredRecords = {};
export let listOfIndustries = [];
export let selectedIndustry = "";

// obj with search values
let searchValues = {
    table: "iotDB",
    name: "",
}

// get the list of available industries
async function getListOfIndustries() {

    let records = await getAllRecords("industriesDB");
    listOfIndustries = records.map(a => a.name);
    searchValues.name = listOfIndustries[0];
}

getListOfIndustries();


//change the value in the object to the one selected
function handleChangeSelect(e) {
    searchValues.name = e.target.value;
}

// get filtered records
export async function getSortedByIndustry(){
    filteredRecords = await searchRecords(searchValues, "Industry");
}


//render out select 
export class Industries extends Component {
    render() {
        return (
            <select name="industrySelect" onChange={handleChangeSelect}> 
                {listOfIndustries.map(val => <option value={val}>{val}</option>)}
        </select>)

    }


}

