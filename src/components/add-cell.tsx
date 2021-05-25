import "./add-cell.css";
import { useActions } from "../hooks/use-actions";

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean ;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { inserCellBefore } = useActions();
  return (
    <div className={forceVisible ? "add-cell force-visible" : "add-cell"}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => inserCellBefore(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => inserCellBefore(nextCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>

      <div className="divider" />
    </div>
  );
};

export default AddCell;
