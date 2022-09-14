import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "../styles.scss";
let TableData = {};
let heading = [];
export function PreviewData() {
    TableData = JSON.parse(localStorage.getItem("CompleteData"));
    heading = Object.keys(TableData[0]);
    const navigate = useNavigate();
    function handleOnClick() {
        navigate("/ViewSelectQuery", { replace: true });
    }
    return (
        <div className="whole-container">
            <div className="previewData-container">
                <Helmet>
                    <title>SQL-Query_replicator</title>
                    <meta name="description" content="App Description" />
                    <meta name="theme-color" content="#008f68" />
                    <style>{"body { background-color: #010a14; color:white}"}</style>
                </Helmet>

                <TableView />
            </div>
            <br />
            <div className="Footer-Div">
                <input
                    type="button"
                    className="gen-btn btn-success rounded-pill preview"
                    value="Check for Duplicates"
                    onClick={handleOnClick}
                />
            </div>
        </div>
    );
}
const TableView = () => {
    // get table heading data
    const ThData = () => {
        return heading.map((data, index) => {
            return <th key={index}>{data}</th>;
        });
    };
    // get table row data

    const tdData = () => {
        return TableData.map((data, index) => {
            return (
                <tr>
                    {heading.map((v, index) => {
                        return <td key={index}>{data[v]}</td>;
                    })}
                </tr>
            );
        });
    };
    return (
        <table className="table">
            <thead>
                <tr>{ThData()}</tr>
            </thead>
            <tbody>{tdData()}</tbody>
        </table>
    );
};
