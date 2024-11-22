import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

export default function NewProject(){

    const navegate = useNavigate();

    function createProject(project){
        fetch("http://localhost:8080/projeto",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            console.log(data);
            navegate("/projects", {state: {message: 'Projeto criado com sucesso!'}})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createProject} btnText="Criar projeto"/>
        </div>
    )
};