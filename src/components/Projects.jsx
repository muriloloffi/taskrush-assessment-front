import { useFetch } from '../useFetch';
import { Link } from 'react-router-dom';

function Projects() {
    const { data: projects, loading, error } = useFetch('/api/projects');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {projects.map(project => (
                <div key={project.id}>
                    <Link to={`/project/${project.id}`}>{project.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default Projects;