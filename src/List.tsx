import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Item } from "./Item";

export function List(props: { id: string; items: Array<string> }) {
  const items = props.items;
  const listId = props.id;

  return (
    <div
      style={{
        minWidth: "350px",
        height: "fit-content",
        border: "1px pink solid",
        padding: "30px",
      }}
    >
      <div style={{ textAlign: "center" }}>{listId}</div>
      <hr />
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((itemId) => (
          <Item id={itemId} key={itemId} />
        ))}
      </SortableContext>
    </div>
  );
}
