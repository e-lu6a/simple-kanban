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

function App() {
  const boards = ["one", "two"];
  const [items, setItems] = useState(["1", "2", "3"]);
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered;
      });
    }
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
          {boards.map((id) => (
            <List id={id} items={items} key={id} />
          ))}
        </div>
      </DndContext>
    </>
  );
}

export default App;
