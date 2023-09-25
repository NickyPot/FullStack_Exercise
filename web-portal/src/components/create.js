import React, { useState } from "react";
import { useParams,useNavigate } from "react-router";
import { Industries, selectedIndustry } from "./sort.js"
import { createNewRecord } from "../api/records.js";



export default function Create() {
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
    const navigate = useNavigate();
    const params = useParams();

    // update the props for either iot or industry
    function updateForm(value, table) {
        if (table == "industriesDB") {
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

    // when submit check all fields ok 
    async function onSubmit(e) {
        e.preventDefault();
        let newRecord = {};
        if (industryForm.name != "") {
            newRecord = {
                table: "industriesDB",
                name: industryForm.name,
            };
        }
        else if (iotForm.DeviceName.trim() != "" && iotForm.wAdditionTime.trim() != "" && iotForm.fee.trim() != "") {
            newRecord = {
                table: "iotDB",
                DeviceName: iotForm.DeviceName,
                wAdditionTime: iotForm.wAdditionTime,
                fee: iotForm.fee,
                Industry: selectedIndustry
            };
        }
        else{
            e.preventDefault();
            window.alert("All fields must be populated");
            return;

        }
        //then send to server to create
        createNewRecord(newRecord);
        window.alert("New record created!")
        //empty form
        setIndustryForm({ name: "", position: "", level: "" });
        navigate("/");
    }
    //check if the input is number
    function checkNumber(e) {
        if (!/^[0-9]*$/.test(e.key)) {
            e.preventDefault();
            window.alert("Only numbers should be inputed in numerical fields")
        }

    }

    //render out either industry or iot form
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
                            value="Create"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
    else if (params.table.toString() == "iotDB") {
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
                        />
                    </div>
                    <div className="form-group">
                        <Industries></Industries>
                    </div>


                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }

    
}