import './resizable.css'
import { useEffect } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps
  useEffect(() => {
    const listener = () => {
      console.log(window.innerHeight, window.innerWidth)
    }
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      resizeHandles: ['e'],
      height: Infinity,
      width: window.innerWidth * 0.75,
    }
  } else {
    resizableProps = {
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      resizeHandles: ['s'],
      height: 300,
      width: Infinity,
    }
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
