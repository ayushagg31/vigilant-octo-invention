"use client";
import React, { useState } from "react";
import { AfterUpload } from "../../components/home/AfterUpload";
import DashboardLayout from "../../components/layout/DashboardLayout";


const DocInsights = () => {
    return <AfterUpload />;
};

export default DocInsights;


DocInsights.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};
