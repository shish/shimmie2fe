import React from "react";

export function FormItem({ label, children }: { label: any; children: any }) {
    return (
        <div className="formItem">
            <label>{label}</label>
            {children}
        </div>
    );
}
