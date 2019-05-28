import * as React from 'react'
import { FC } from 'react'
import { render } from 'react-dom'
import { lensesFromRecord } from './utils'
import './styles.css'
import { Option, none } from 'fp-ts/lib/Option'

const { useRef, useEffect, useState } = React

const config: Record<string, boolean> = {
  foo1: true,
  foo2: false,
  foo3: false,
}

let r = lensesFromRecord(config)

// console.log('r', r.foo1.set(false)(config))
// console.log(r.foo1.get(config))

// spread operator with tuples
// type Example = [string, boolean, number]
// const example = (...args: Example) => {}
// example('s', true, 1)

type Props = {
  p?: string
}

const df = {
  p: 'hi',
}

type MCProps = Props & typeof df

const MyComp: FC<MCProps> = ({ p }) => <div>{p}</div>

MyComp.defaultProps = df

type FProps = {
  foo: number
  bar: Option<string>
}

const Foo: FC<FProps> = ({ foo = 1, bar }) => {
  return (
    <>
      {foo} + {bar.getOrElse('hello')}
    </>
  )
}

function App() {
  const [text, setText] = useState('')
  return (
    <div className="App">
      <h1>
        Hello <code>fp-ts</code>
      </h1>
      <Foo foo={23} bar={none} />
      <MyComp p={undefined} />
      <input value={text} onChange={v => setText(v.target.value)} />
      <p>Just want to see what a paragraph of this font looks like.</p>
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
