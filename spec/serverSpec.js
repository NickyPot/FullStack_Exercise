var request = require("request")

var base_url = "http://localhost:5050/record/"

// let testId = "" 

describe("Tests for creating, search and editing", function () {

    describe("Edit Test", function () {

        //before anything, create the record
        beforeAll(function (done) {
            setTimeout(async () => {

                let response = await fetch(`http://localhost:5050/record/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ table: "industriesDB", name: "test" })

                });
                expect(response.status).toBe(200);
                done();


            })
        });

        //then search for it and edit it
        it("returns status code 200", function (done) {
            setTimeout(async() =>{
                //get the record with test in the name field
                let firstResponse = await fetch(`http://localhost:5050/record/search`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ table: "industriesDB", field: "name", value: "test" })

                });
                // make sure everything went ok and get the id
                expect(firstResponse.status).toBe(200);
                record = await firstResponse.json();
                testId = record[0]._id.toString();
                //based on the id, edit it to say test2
                let response = await fetch(`http://localhost:5050/record/edit`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ table: "industriesDB", id: testId, name: "test2" })

                });
                expect(response.status).toBe(200);
                done();
            })
        });

    });

    // after all is done, find it and delete it
    afterAll(function (done) {
        setTimeout(async () => {
            //find the id
            let respons = await fetch(`http://localhost:5050/record/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ table: "industriesDB", field: "name", value: "test2" })

            });
            expect(respons.status).toBe(200);
            record = await respons.json();
            testId = record[0]._id.toString();
            //delete it
            let response = await fetch(`http://localhost:5050/record/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ table: "industriesDB", id: testId})

            });
            expect(respons.status).toBe(200);
            done();
        })
    });



});

describe("Get all records test", function () {

    it("returns status code 200", async () => {
        //send http request to get table records
        let response = await fetch(`http://localhost:5050/record/table`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ table: "iotDB" }),

        });
        expect(response.status).toBe(200);
    });

});

describe("Get invalid table test", function () {

    it("returns empty array", async () => {
        //send http request to get table records
        let response = await fetch(`http://localhost:5050/record/table`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ table: "test" }),

        });
        expect(response.status).toBe(200);
        expect(await response.json()).toHaveSize(0);

    });

});

describe("Get sorted records test", function () {

    it("returns status code 200", async () => {
        //send http request to get sorted table
        let response = await fetch(`http://localhost:5050/record/sort`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ table: "iotDB", field: "DeviceName", order: 1 }),

        });
        expect(response.status).toBe(200);
    });

});

describe("Get invalid table sorted records", function () {

    it("returns empty array", async () => {
        //send http request to get sorted table from non existent table
        let response = await fetch(`http://localhost:5050/record/sort`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ table: "iotDB", field: "test", order: 1 }),

        });
        expect(response.status).toBe(200);
        expect(await response.body).toHaveSize(0);
    });

});

describe("Search for record test by DeviceName", function () {

    it("returns status code 200", async () => {
        //send http request to get Smart Light Record
        let response = await fetch(`http://localhost:5050/record/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ table: "iotDB", field: "DeviceName", value: "Smart Light" })

        });
        expect(response.status).toBe(200);
    });

});

describe("Search for record from invalid table", function () {

    it("returns empty array", async () => {
        // send http request to get record from non existent table
        let response = await fetch(`http://localhost:5050/record/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ table: "iotDB", field: "test", value: "Smart Light" })

        });
        expect(response.status).toBe(200);
        expect(await response.body).toHaveSize(0);
    });

});

describe("Search by table and id", function () {

    it("returns status code 200", function (done) {
        setTimeout(async () => {
            // send request to get record by table and id
            let response = await fetch(`http://localhost:5050/record/tableid`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ table: "iotDB", id: "650c29e7a865ca02341cadb5" })

            });
            expect(response.status).toBe(200);
            done();

        });

    });


});

describe("Search by table and id from invalid table", function () {

    it("returns empty array", async () => {
        //send http request to get record by id from non existent table
        let response = await fetch(`http://localhost:5050/record/tableid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ table: "test", id: "650c29e7a865ca02341cadb5" }),

        });
        expect(response.status).toBe(200);
        expect(await response.body).toHaveSize(0);

    });

});
