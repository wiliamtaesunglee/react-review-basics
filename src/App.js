import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

import Header from './components/Header';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
      console.log(response.data)
    })
  }, [])
  
  const handleAddProject = async () => {
    const response = await api.post('projects', {
      title: `novo projeto, ${Date.now()}`,
      owner: 'Wil.i.am'
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <Header />

      <ul>
        {projects.map((project, index) => <li key={project + index}>{project.title}</li>)}
      </ul>

      <button type='button' onClick={handleAddProject}>Add new project</button>
    </>
  )
};

export default App;