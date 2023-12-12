import BarGraph from "./components/BarGraph";
import PieChart from "./components/PieChart";
import Doughnut from "./components/DoughnutChart";
import { useState } from "react";
import { Button } from "@mui/material";
const Card = ({ id, title, isDraggable, image, isEditable, setEditingCard }) => {
  // const { attributes, listeners, setNodeRef, transition, transform } =
  //   useSortable({
  //     id: id,
  //   });
  const style = {
    margin: "10px",
    opacity: 1,
    color: "#333",
    background: "white",
    padding: "10px",

  };

  const gridStyle = {
    margin: "10px",
    opacity: 1,
    color: "#333",
    background: "white",
    padding: "10px",
  };
  const wrapperStyle = {
    height: "120px", // Adjust this height to match your ReactGridLayout rowHeight
  };

  const [values, setValue] = useState('');

  const editdata = (e) => {
    setValue(e.target.value);

  }

  return (!isDraggable && id === 'bargraph') ?
    (
      <div style={{ height: '85%' }}>
        {isEditable ? <><input type="text" value={values} placeholder="Enter Title" onChange={editdata} /> <Button onClick={() => setEditingCard(false)}>Done</Button>  </> :

          <BarGraph title={values} ></BarGraph>
        }
      </div>


    ) : (!isDraggable && id == 'piechart') ?
      (
        <div style={{ height: '85%' }}>


          <PieChart title={values} ></PieChart>

        </div>
      ) : (!isDraggable && id == 'doughnut') ?
        (
          <div style={{ height: '85%' }}>
            <Doughnut />
          </div>
        )
        : (
          <div id={id}>
            <p>{title}</p>
            <div style={{ height: '200px', width: '220px' }}>
              <img src={image} style={{ height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%' }} alt="bar graph" />
            </div>
          </div>
        )
};

export default Card;
