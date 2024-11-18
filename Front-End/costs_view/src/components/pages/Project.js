import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../layout/Loading.js";
import Container from "../layout/Container.js";
import ProjectForm from "../project/ProjectForm.js";
import Message from '../layout/Message.js';

export default function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProject, setShowProject] = useState(false);
  const [typeMessage, setTypeMessage] = useState();
  const [txtMessage, setTxtMessage] = useState();
  
  useEffect(() => {
    fetch(`http://localhost:8080/projeto/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function editPost(project) {
    fetch(`http://localhost:8080/projeto/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data)=>{
        setProject(data);
        setShowProject(!showProject);
        setTypeMessage("sucess");
        setTxtMessage("Projeto Editado com Sucesso!");
      })
      .catch((error) => {
        console.log(error);
        setTypeMessage("error");
        setTxtMessage("Ocorreu um erro!");
      });
  }


  function toggleProjectForm() {
    setShowProject(!showProject);
  }

  return (
    <>
      {!project.nome ? (
        <Loading />
      ) : (
        <div className={styles.project_details}>
          <Container customClass="column">
            <Message type={typeMessage} msg={txtMessage}/>
            <div className={styles.details_container}>
              <h1>Projeto: {project.nome}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {showProject ? "Fechar" : "Editar Projeto"}
              </button>
              {showProject ? (
                <div className={styles.project_info}>
                  <ProjectForm
                    btnText={"Concluir Edição"}
                    handleSubmit={editPost}
                    projectData={project}
                  />
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span>
                    {project.categoria}
                  </p>
                  <p>
                    <span>Total de Orçamento: R$ </span>
                    {project.orcamento}
                  </p>
                  <p>
                    <span>Total Utilizado: R$ </span>
                    {project.totalUtilizado}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
