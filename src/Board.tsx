import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Item } from "./Item";

interface BoardProps {
  id: number;
  title: string;
  items: Array<string>;
}

export function BoardComponent(props: BoardProps) {
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
      <div style={{ textAlign: "center" }}>{props.title}</div>
      <hr />
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((itemId) => (
          <Item id={itemId} key={itemId} />
        ))}
      </SortableContext>
    </div>
  );
}
