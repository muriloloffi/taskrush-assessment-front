import { Router, Route } from 'react-router-dom'
import './App.css'
import Project from './components/Project'
import Projects from './components/Projects'

function App() {

  return (
    <Router>
      <Route path="/" component={ Projects } />
      <Route path="/project/:id" component={ Project } />
    </Router>
  )
}

export default App
