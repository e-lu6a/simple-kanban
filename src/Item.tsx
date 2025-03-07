import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRef } from "react";
import { Item } from "@prisma/client";

interface ItemProps {
  id: number;
  key: number;
  item: Item;
}

export function ItemComponent(props: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // update textArea height based on input
  function handleValueChange(e: any) {
    e.target.style.height = "auto";
    const contentHeight = e.target.scrollHeight;
    e.target.style.height = `${contentHeight}px`;
  }

  // clicks on div outside of textarea still focuses textarea
  function onDivClick() {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }

  const style = {
    margin: "10px 0px",
    backgroundColor: "snow",
    borderRadius: "8px",
    padding: "7px 10px 0px 10px",

    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        onClick={onDivClick}
        {...listeners}
        {...attributes}
        tabIndex={-1}
      >
        <textarea
          ref={textAreaRef}
          rows={1}
          defaultValue={props.item.content}
          style={{
            boxSizing: "border-box",
            fontFamily: "inherit",
            lineHeight: "1em",
            minHeight: "1.5em",
            width: "100%",
            resize: "none",
            outline: "none",
            overflowY: "hidden", // gets rid of the sometimes extra row, similar https://github.com/Semantic-Org/Semantic-UI-React/issues/2173#issuecomment-336794270
            backgroundColor: "transparent",
            border: "none",
          }}
          onChange={handleValueChange}
        />
      </div>
    </>
  );
}
