import React from "react";


export function FormItem({ label, children }) {
    return <div className="formItem">
        <label>{label}</label>
        {children}
    </div>;
}
