import { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  PointerSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { BoardComponent } from "./Board";
import axios, { AxiosResponse } from "axios";
import type { Board } from "@prisma/client";

function App() {
  const [boards, setBoards] = useState<Board[]>([]);

  // get boards at first load only (for now)
  useEffect(() => {
    axios
      .get("http://localhost:8080/boards/")
      .then((response) => setBoards(response.data))
      .catch((error) => console.error("error fetching boards: ", error));
  }),
    [];

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
          {boards.map((board) => (
            <BoardComponent
              id={board.id}
              key={board.id}
              title={board.title}
              items={items}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
}

export default App;
