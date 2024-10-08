import React, { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Define the type for the data prop
interface HeartChartProps {
    data: { Date: string; Weight: number }[];
}

// Define and export the HeartChart component
export default function HeartChart({ data }: HeartChartProps) {
    // Log the data prop to the console
    console.log(`HeartChart data prop: ${JSON.stringify(data)}`);

    const [windowWidth, setWindowWidth] = useState(window.innerHeight)
    const windowWidthMargin = 0.8

    const [maxYValue, setMaxYValue] = useState(0);

    //to constantly resize
    useEffect(() => {

        // for updating max Y-Axis value
        if (data.length > 0){
            const maxWeight = Math.max(...data.map(entry => entry.Weight))
            setMaxYValue(maxWeight + 10); //10 is padding
            console.log(maxYValue);
            
        }

        function handleResize(){
            setWindowWidth(window.innerWidth)
        };

        window.addEventListener('resize', handleResize)

        return () =>{
            window.removeEventListener('resize', handleResize)
        }
    }, [data]);

    const tickFormatter = (tick: string, index: number) =>{
        if (index % 14 === 0){
            return tick;
        }
        return '';
    }

    return (
        // Create a LineChart with specified width, height, and data
        <LineChart width={windowWidth * windowWidthMargin} height={300} data={data} >
            {/* Add a Cartesian grid with dashed lines */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* Add an X-axis with Date as the data key */}
            <XAxis dataKey="Date" tickFormatter={tickFormatter}  />
            {/* Add a Y-axis */}
            <YAxis domain={[0, maxYValue]}/>
            {/* Add a tooltip to show data on hover */}
            <Tooltip />
            {/* Add a legend to describe the data */}
            <Legend />
            {/* Add a line to the chart with Weight as the data key and a specified stroke color */}
            <Line type="monotone" dataKey="Weight" stroke="#8884d8" />
        </LineChart>
    );
}