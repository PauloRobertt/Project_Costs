import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Loading from '../layout/Loading.js';
import Container from '../layout/Container.js';

export default function Project(){

    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [showProject, setShowProject] = useState(false);

    useEffect(()=>{
        fetch(`http://localhost:8080/projeto/${id}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setProject(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id])

    function toggleProjectForm(){
        setShowProject(!showProject);
    }

    return(
        <>
            {!project.nome ? <Loading/> : 
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.nome}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {showProject ? "Fechar" : "Editar Projeto"}
                            </button>
                            {showProject ?
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.categoria}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: R$ </span>{project.orcamento}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: R$ </span>{project.totalUtilizado}
                                    </p>
                                </div> :
                                <div className={styles.project_info}>
                                    <p>Detalhes do projeto</p>
                                </div>
                            }
                        </div>
                    </Container>
                </div>
            }
        </>
    );
}