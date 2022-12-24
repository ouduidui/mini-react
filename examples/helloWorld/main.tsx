import { createRoot } from 'react-dom'

function App() {
  return <h3>hello world</h3>
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
