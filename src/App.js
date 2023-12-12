import Column from "./Column";
import React from "react";
import "./App.css";
import bargraph from './assets/barGraph.jpg'
import piegraph from './assets/piegraph.jpg'
import doughnut from './assets/doughnut.png'




export default function App() {
  
  const data = [
    {
      id: "Dashboard",
      title: "Dashboard",
      cards: [
        
      ],
    },
    {
      id: "Widgets",
      title: "Widgets",
      cards: [
        { 
          id: 'bargraph',
          title: "Bar Graph",
          image:bargraph
        },
        {
          id: "piechart",
          title: "Pie Chart",
          image:piegraph
          
        },
        {
          id: "doughnut",
          title: "Doughnut Chart",
          image:doughnut
        },
      ],
    },
  ];

  return (
    
      <div
        className="App"
        style={{ display: "flex", flexDirection: "column", padding: "20px", gap:'12px' }}
      >
        
        {data.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
          ></Column>
        ))}
      </div>
  );
}
