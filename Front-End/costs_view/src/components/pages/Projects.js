import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from './Projects.module.css';
import Container from '../layout/Container.js'

import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton.js";
import ProjectCard from "../project/ProjectCard.js";

export default function Projects(){
    const [projects, setProjects] = useState([]);

    const location = useLocation();
    let message = '';

    if(location.state){
        message = location.state.message;
    }

    useEffect(()=>{
        fetch("http://localhost:8080/projeto",{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setProjects(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Novo Projeto"/>
            </div>
            {message && <Message type="sucess" msg={message}/>}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) => <ProjectCard
                    id={project.id}
                    nome={project.nome}
                    orcamento={project.orcamento}
                    categoria={project.categoria}
                    key={project.id}
                />)}
            </Container>
        </div>
    );
}