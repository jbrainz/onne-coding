import "./code-cell.css";
import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCummulativeCode } from '../hooks/use-commulative'

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  //@ts-ignore
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  
const cummulativeCode = useCummulativeCode(cell.id)
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cummulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cummulativeCode)
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cummulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(val) => updateCell(cell.id, val)}
            initialValue={cell.content}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} status={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};
export default CodeCell;
