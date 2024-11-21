import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../layout/Loading.js";
import Container from "../layout/Container.js";
import ProjectForm from "../project/ProjectForm.js";
<<<<<<< Updated upstream
import Message from '../layout/Message.js';
=======
import ServiceForm from "../service/ServicoForm.js";
import Message from '../layout/Message.js';
import ServicoCard from "../service/ServicoCard.js";
>>>>>>> Stashed changes

export default function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
<<<<<<< Updated upstream
  const [showProject, setShowProject] = useState(false);
  const [typeMessage, setTypeMessage] = useState();
  const [txtMessage, setTxtMessage] = useState();
  
=======
  const [service, setService] = useState([]);
  const [showProject, setShowProject] = useState(false);
  const [showServico, setShowServico] = useState(false);
  const [typeMessage, setTypeMessage] = useState();
  const [txtMessage, setTxtMessage] = useState();

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  function editPost(project) {
=======
  useEffect(() => {
    fetch("http://localhost:8080/servico", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setService(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  function editPost(project) {
    setTxtMessage('');

    if (project.orcamento < project.totalUtilizado) {
      setTypeMessage('error');
      setTxtMessage('Custo muito elevado!');
      return false;
    }

>>>>>>> Stashed changes
    fetch(`http://localhost:8080/projeto/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
<<<<<<< Updated upstream
      .then((data)=>{
=======
      .then((data) => {
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
  function createService(service) {
    setTxtMessage('');

    if (project.orcamento < project.totalUtilizado) {
      setTypeMessage('error');
      setTxtMessage('Custo muito elevado!');
      return false;
    }

    fetch("http://localhost:8080/servico", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(service)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTypeMessage("sucess");
        setTxtMessage("Projeto Editado com Sucesso!");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
>>>>>>> Stashed changes

  function toggleProjectForm() {
    setShowProject(!showProject);
  }

<<<<<<< Updated upstream
=======
  function toggleServicoForm() {
    setShowServico(!showServico);
  }

>>>>>>> Stashed changes
  return (
    <>
      {!project.nome ? (
        <Loading />
      ) : (
        <div className={styles.project_details}>
          <Container customClass="column">
<<<<<<< Updated upstream
            <Message type={typeMessage} msg={txtMessage}/>
=======
            <Message type={typeMessage} msg={txtMessage} />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServicoForm}>
                {showServico ? "Fechar" : "Adicionar Serviço"}
              </button>
              {!showServico ?
                <div className={styles.project_info}></div> :
                <div className={styles.project_info}>
                  <ServiceForm
                    btnText={"Adicionar Serviço"}
                    handleSubmit={createService}
                    projectData={project}
                  />
                </div>}
            </div>
            <h2>Serviços:</h2>
            <Container customClass='start'>
              {service.length > 0 &&
                service.map((servico) =>
                  <ServicoCard
                    id={servico.id}
                    nome={servico.nome}
                    descricao={servico.descricao}
                    custo={servico.custo}
                    key={servico.id}
                  />
                )}
            </Container>
>>>>>>> Stashed changes
          </Container>
        </div>
      )}
    </>
  );
}
