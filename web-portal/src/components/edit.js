import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Industries, selectedIndustry } from "./sort.js"
import { getRecordById, editRecord } from "../api/records.js";


export default function Edit() {
    //obj for industry data
    const [industryForm, setIndustryForm] = useState({
        name: "",
        records: [],
    });
    //obj for iot data
    const [iotForm, setIotForm] = useState({
        DeviceName: "",
        wAdditionTime: "",
        fee: "",
        Industry: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            //get the data of the record to be editted and populate form
            const record = await getRecordById(params.table.toString(), params.id.toString());
            if (!record) {
                window.alert(`Record with id ${params.id.toString()} not found`);
                navigate("/");
                return;
            }
            //populate appropriate form
            if (params.table.toString() == "industriesDB"){
                setIndustryForm(record);
            }
            else if (params.table.toString() == "iotDB"){
                setIotForm(record);
            }
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // Update form with appropriate data
    function updateForm(value, table) {
        if(table == "industriesDB"){
            return setIndustryForm((prev) => {
                return { ...prev, ...value };
            });
        }
        else if (table == "iotDB") {
            return setIotForm((prev) => {
                return { ...prev, ...value };
            });
        }

    }
    //check if input is number
    function checkNumber(e){
        if (!/^[0-9]*$/.test(e.key)){
            e.preventDefault();
            window.alert("Only numbers should be inputed in numerical fields")
        }

    }

    //when submitted, check everything ok and send request to edit record
    async function onSubmit(e) {
        e.preventDefault();
        let editedRecord = {};
        //make sure editted record is populated ok
        if(industryForm.name != ""){

            
            editedRecord = {
                table: "industriesDB",
                id: params.id,
                name: industryForm.name,
            };
            

        }
        else if (iotForm.DeviceName.trim() != "" && iotForm.wAdditionTime.trim() != "" && iotForm.fee.trim() != ""){
            editedRecord = {
                table: "iotDB",
                id: params.id,
                DeviceName: iotForm.DeviceName,
                wAdditionTime: iotForm.wAdditionTime,
                fee: iotForm.fee,
                Industry: selectedIndustry
            };
        }
        //if not then alert
        else{
            e.preventDefault();
            window.alert("All fields must be populated");
            return;
        }
        
        //send edit request
        editRecord(editedRecord);

        navigate("/");
    }

    //render appropriate form
    if (params.table.toString() == "industriesDB") {
        return (
            <div>
                <h3>Update Industries Record</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={industryForm.name}
                            onChange={(e) => updateForm({ name: e.target.value }, "industriesDB")}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Update Record"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
    else if (params.table.toString() == "iotDB"){
        // This following section will display the form that takes input from the user to update the data.
        return (
            <div>
                <h3>Update IoT Record</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={iotForm.DeviceName}
                            onChange={(e) => updateForm({ DeviceName: e.target.value }, "iotDB")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Addition Time: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="wAdditionTime"
                            value={iotForm.wAdditionTime}
                            onChange={(e) => updateForm({ wAdditionTime: e.target.value }, "iotDB")}
                            onKeyDown={checkNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Fee: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fee"
                            value={iotForm.fee}
                            onChange={(e) => updateForm({ fee: e.target.value }, "iotDB")}
                            onKeyDown={checkNumber}
                        />
                    </div>
                    <Industries></Industries>


                    <div className="form-group">
                        <input
                            type="submit"
                            value="Update Record"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }



}