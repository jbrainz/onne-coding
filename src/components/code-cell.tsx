import { useState, useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import { bundler } from '../bundler'
import Resizable from './resizable'

const CodeCell = () => {
  const [input, setInput] = useState('')
  const [err, setErr] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input)
      setCode(output.code)
      setErr(output.err)
    }, 1500)
    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(val) => setInput(val)}
            initialValue="const a =1;"
          />
        </Resizable>
        <Preview code={code} status={err} />
      </div>
    </Resizable>
  )
}
export default CodeCell
