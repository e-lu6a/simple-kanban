import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { ItemComponent } from "./Item";
import { Item } from "@prisma/client";

interface BoardProps {
  id: number;
  title: string;
  items: Item[];
}

export function BoardComponent(props: BoardProps) {
  const items = constructOrderedItemArray(props.items);
  const id = props.id;
  // const { setNodeRef } = useDroppable({ id });

  return (
    <div
      style={{
        minWidth: "350px",
        height: "fit-content",
        border: "1px pink solid",
        padding: "30px",
      }}
    >
      <div style={{ textAlign: "center" }}>{props.title}</div>
      <hr />
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {/* <div ref={setNodeRef}> */}
        {items.map((item) => (
          <ItemComponent id={item.id} key={item.id} item={item} />
        ))}
        {/* </div> */}
      </SortableContext>
    </div>
  );
}

// items are not necessarily in order, we need to reconstruct it
function constructOrderedItemArray(items: Item[]) {
  const orderedItems = [];
  let currentItem = items.find((item) => item.prevItemId == null);

  while (currentItem) {
    orderedItems.push(currentItem);
    currentItem =
      items.find((item) => item.prevItemId === currentItem!.id) || undefined;
  }

  return orderedItems;
}
