// import {
//   SortableContext,
//   rectSortingStrategy,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import ReactGridLayout from "react-grid-layout";
import React, { useState } from "react";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import barGraph from "./assets/barGraph.jpg";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Chip, Dialog, Divider, IconButton, Paper } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
const gridStyle = {
  margin: "10px",
  opacity: 1,
  color: "#000000",
  background: "#FFFFFF",
};

const Column = ({ id, title, cards, style }) => {
  const { setNodeRef } = useDroppable({ id: id });
  const [open, setOpen] = useState(false);
  const isDraggable = id === "Widgets";
  // Assign unique 'i' values to each card in the layout
  const [layout, setLayout] = useState([]);

  const [gridCards, setGridCards] = useState([]);

  const onResize = (newLayouts) => {
    console.log("newLayouts", newLayouts);
    setLayout(newLayouts);
    updateGridCards(newLayouts);
  };
  const updateGridCards = (newLayouts) => {
    setGridCards((prevGridCards) => {
      return newLayouts.map((layoutItem) => {
        const existingCardIndex = prevGridCards.findIndex(
          (card) => card.i === layoutItem.i
        );

        if (existingCardIndex !== -1) {
          // Update existing card with new layout information
          return { ...prevGridCards[existingCardIndex], ...layoutItem };
        } else {
          // Add new card to gridCards
          return {
            i: layoutItem.i,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
      });
    });
  };

  const onLayoutChange = (newLayouts) => {
    setLayout(newLayouts);
  };

  React.useEffect(() => {
    if (localStorage.getItem("dashboard")) {
      const dashboardData = JSON.parse(localStorage.getItem("dashboard"));
      setGridCards(dashboardData);
    }
  }, []);

  const onDrop = (layout, layoutItem, event, elements) => {
    const widgetData = JSON.parse(event.dataTransfer.getData("text/plain"));
    let randomIdentifier;
    let isUniqueIdentifier = false;

    while (!isUniqueIdentifier) {
      randomIdentifier = Math.random().toString(36).substring(7);
      isUniqueIdentifier = !gridCards.some(
        (card) => card.i === `${widgetData.id}_${randomIdentifier}`
      );
    }
    const newWidget = {
      ...widgetData,
      i: `${widgetData.id}_${randomIdentifier}`,
      x: layoutItem.x,
      y: layoutItem.y,
      w: 1,
      h: 2,
      minW: 1,
      minH: 2,
    };
    console.log("layoutItem", newWidget);
    console.log("widgetData", widgetData);
    setGridCards((prevWidgets) => [...prevWidgets, newWidget]);
    setLayout((prevLayout) => [...prevLayout, newWidget]);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const save = () => {
    localStorage.setItem("dashboard", JSON.stringify(gridCards));
  };

  if (isDraggable) {
    return (
      <div
        style={{
          background: "#adbbc4",
          borderRadius:'4px',
          marginRight: "10px",
          padding: "12px",
        }}
      >
        <p
          style={{
            padding: "5px 20px",
            textAlign: "left",
            fontWeight: "500",
            color: "#575757",
          }}
        >
          {title}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              style={gridStyle}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", JSON.stringify(card))
              }
            >
              <Card
                id={card.id}
                title={card.title}
                isDraggable={isDraggable}
                image={card.image}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      // <SortableContext id={id} items={cards} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          background: "#adbbc4",
          borderRadius:'4px',
          marginRight: "10px",
          padding: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p
            style={{
              padding: "5px 20px",
              textAlign: "left",
              fontWeight: "500",
              color: "#575757",
              display: "inline",
            }}
          >
            {title}
          </p>
          <div>
            {gridCards.length > 0 && (
              <Button
                style={{ display: "inline" }}
                variant="contained"
                onClick={save}
              >
                Save
              </Button>
            )}
          </div>
        </div>

        <ReactGridLayout
          className="layout"
          compactType={"vertical"}
          // layout={layout}
          onDrop={onDrop}
          isDroppable={true}
          cols={4}
          width={1200}
          onResize={onResize}
          onLayoutChange={onLayoutChange}
          draggableHandle=".draggableHandle"
          // isBounded={true}
        >
          {gridCards.length > 0 &&
            gridCards.map((card, index) => (
              <div
                key={card.i}
                className="gridStyle"
                data-grid={{
                  x: card.x,
                  y: card.y,
                  h: card.h,
                  w: card.w,
                  minH: card.minH,
                  minW: card.minW,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                  }}
                >
                  <Chip
                    label="Drag Here"
                    style={{ background: "gray", cursor: "pointer" }}
                    className="draggableHandle"
                  ></Chip>
                  <div className="optionsContainer">
                    <IconButton onClick={() => setOpen(true)}>
                      <EditIcon style={{ color: "#000000" }}></EditIcon>
                    </IconButton>
                  </div>
                </div>
                <Divider sx={{fontWeight:'600'}}/>
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  isDraggable={false}
                  image={barGraph}
                />
              </div>
            ))}
        </ReactGridLayout>

        <Dialog open={open} handleClose={handleClose}>
          <Paper>
            <Chip label="hello">Hello</Chip>
            <CloseOutlined onClick={() => setOpen(false)}></CloseOutlined>
          </Paper>
        </Dialog>
      </div>
    );
  }
};

export default Column;
