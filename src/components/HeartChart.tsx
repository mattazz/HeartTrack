import React from "react";
// Import necessary components from recharts library
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Define the type for the data prop
interface HeartChartProps {
    data: { Date: string; Weight: number }[];
}

// Define and export the HeartChart component
export default function HeartChart({ data }: HeartChartProps) {
    // Log the data prop to the console
    console.log(`HeartChart data prop: ${JSON.stringify(data)}`);

    return (
        // Create a LineChart with specified width, height, and data
        <LineChart width={600} height={300} data={data}>
            {/* Add a Cartesian grid with dashed lines */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* Add an X-axis with Date as the data key */}
            <XAxis dataKey="Date" />
            {/* Add a Y-axis */}
            <YAxis />
            {/* Add a tooltip to show data on hover */}
            <Tooltip />
            {/* Add a legend to describe the data */}
            <Legend />
            {/* Add a line to the chart with Weight as the data key and a specified stroke color */}
            <Line type="monotone" dataKey="Weight" stroke="#8884d8" />
        </LineChart>
    );
}