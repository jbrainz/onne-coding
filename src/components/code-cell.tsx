import { useState, useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import { bundler } from '../bundler'
import Resizable from './resizable'
import { Cell } from '../state'
import {useActions} from '../hooks/use-actions'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const [err, setErr] = useState('')
  const [code, setCode] = useState('')
  const {updateCell} = useActions()
  
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content)
      setCode(output.code)
      setErr(output.err)
    }, 1500)
    return () => {
      clearTimeout(timer)   
    }
  }, [cell.content])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(val) => updateCell(cell.id, val)}
            initialValue={cell.content}
          />
        </Resizable>
        <Preview code={code} status={err} />
      </div>
    </Resizable>
  )
}
export default CodeCell
