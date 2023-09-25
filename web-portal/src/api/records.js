//checks if the reponse from an http request was ok, if not alert user
function checkResponseOk(response){
    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }
}

// get all records from db given table
export async function getAllRecords(table){
    const response = await fetch(`http://localhost:5050/record/table`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ table: table }),

    });
    checkResponseOk(response);

    let recordsToReturn = await response.json();
    return recordsToReturn;

}

//get sorted records given the table, and the field to sort by
export async function getSortedRecords(table, field, order){

    const response = await fetch(`http://localhost:5050/record/sort`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ table: table, field: field, order: order }),

    });

    checkResponseOk(response);
    let recordsToReturn = await response.json();
    return recordsToReturn;

}

// searches for a record given the input into the search form (what table and value) as well as the field to search by
export async function searchRecords(searchForm, byField){
    let body = {}
    // create the json body with the fields relevant to the table being searched
    if (searchForm.table == "industriesDB") {
        body = JSON.stringify({ table: searchForm.table, field: byField, value: searchForm.name })
    }
    else if (searchForm.table == "iotDB") {
        body = JSON.stringify({ table: searchForm.table, field: byField, value: searchForm.name })
    }
    //send request
    const response = await fetch(`http://localhost:5050/record/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,

    });
    checkResponseOk(response);

    let recordsToReturn = await response.json();
    return recordsToReturn;
} 

// get a record given its id and table
export async function getRecordById(table, id) {

    const response = await fetch(`http://localhost:5050/record/tableid`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ table: table, id: id }),

    });

    checkResponseOk(response);

    let recordsToReturn = await response.json();
    return recordsToReturn;
}

// edit record, given the new values 
export async function editRecord(editedRecord) {

    const response = await fetch(`http://localhost:5050/record/edit`, {
        method: "POST",
        body: JSON.stringify(editedRecord),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    checkResponseOk(response);
}

// create a new record, given the values to be used
export async function createNewRecord(newRecord){
    const response = await fetch("http://localhost:5050/record/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
    });
    checkResponseOk(response);

}
