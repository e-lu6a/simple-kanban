import { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  PointerSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { BoardComponent } from "./Board";
import axios from "axios";
import type { Prisma, Board, Item } from "@prisma/client";

function App() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [activeItemId, setActiveItemId] = useState();

  // get boards at first load only (for now)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boardsResponse, itemsResponse] = await Promise.all([
          axios.get("http://localhost:8080/boards"),
          axios.get("http://localhost:8080/items"),
        ]);

        setBoards(boardsResponse.data);
        setItems(itemsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  // a lot of code from: https://codesandbox.io/p/sandbox/dnd-kit-multi-containers-lknfe?file=%2Fsrc%2Fapp.js%3A86%2C18

  // function handleDragStart(event: any) {
  //   setActiveItemId(event.active.id);
  // }

  // function handleDragOver(event) {
  //   const { active, over, draggingRect } = event;
  //   const activeItemId = active.id;

  //   const activeBoardId = items.find((item) => item.id == active.id)?.boardId;
  //   const overBoardId = items.find((item) => item.id == over.id)?.boardId;

  //   if (!activeBoardId || !overBoardId || activeBoardId == overBoardId) {
  //     return;
  //   }

  //   // need to setItems here..
  // }

  function getItemIndex(itemId: number) {}

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeItem = items.find((item) => item.id == active.id);
      const overItem = items.find((item) => item.id == over.id);

      if (!activeItem || !overItem) return;

      const isActiveDirectlyAboveOver = overItem.prevItemId === activeItem.id;
      const nextItem = isActiveDirectlyAboveOver
        ? items.find((item) => item.prevItemId === over.id)
        : items.find((item) => item.prevItemId == active.id);

      const reordered = items.map((i) => {
        if (activeItem && overItem)
          if (i.id === activeItem.id) {
            return {
              ...i,
              prevItemId: isActiveDirectlyAboveOver
                ? overItem.id
                : overItem.prevItemId,
            };
          } else if (i.id === overItem.id) {
            return {
              ...i,
              prevItemId: isActiveDirectlyAboveOver
                ? activeItem.prevItemId
                : activeItem.id,
            };
          } else if (nextItem && i.id === nextItem.id) {
            return {
              ...i,
              prevItemId: isActiveDirectlyAboveOver
                ? activeItem.id
                : overItem.id,
            };
          }
        return i;
      });
      setItems(reordered);
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
              items={items.filter((item) => item.boardId === board.id)}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
}

export default App;
