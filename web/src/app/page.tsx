import React from "react";
import DashboardPage from "./dashboard/page";
import { TtsDemoCard } from "../components/TtsDemoCard";

export default function Page() { 
   return (
        <>
            {/* <div className="py-10">
                <TtsDemoCard /> 
            </div> */}
            
            <DashboardPage />
        </>
    );
}