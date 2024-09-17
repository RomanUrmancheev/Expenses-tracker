import { ICategories } from "../../interfaces";

interface GroupListProps {
  items: ICategories[];
  onItemSelect: (item: ICategories) => void;
  selectedItem: string;
}

const GroupList = ({ items, onItemSelect, selectedItem }: GroupListProps) => {
  if (!Array.isArray(items)) {
    return (
      <ul className="list-group">
        {Object.keys(items).map((item) => (
          <li
            key={items[item]["_id"]}
            className={
              "list-group-item" +
              (items[item]["_id"] === selectedItem ? " active" : "")
            }
            onClick={() => onItemSelect(items[item])}
            role="button"
          >
            {items[item]["title"]}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={
            "list-group-item" + (item._id === selectedItem ? " active" : "")
          }
          onClick={() => onItemSelect(item)}
          role="button"
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
