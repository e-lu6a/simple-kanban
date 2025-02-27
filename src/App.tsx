import { useState } from "react";
import {
  DndContext,
  useSensor,
  PointerSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { List } from "./List";
import axios from "axios";

function App() {
  const lists = ["one", "two"];
  const [items, setItems] = useState(["1", "2", "3"]);
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered;
      });
    }

    // call the backend~!
    // get data from server when item is dragged, and display in FE console
    axios.get("http://localhost:8080/").then((data) => console.log(data));
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div
          style={{
            border: "1px green solid",
            height: "calc(100vh - 50px)",
            width: "calc(100% - 50px)",
            margin: "24px",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            boxSizing: "border-box",
            paddingLeft: "80px",
            paddingTop: "150px",
          }}
        >
          {lists.map((id) => (
            <List id={id} items={items} key={id} />
          ))}
        </div>
      </DndContext>
    </>
  );
}

export default App;
