import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../layout/Loading.js";
import Container from "../layout/Container.js";
import ProjectForm from "../project/ProjectForm.js";
import ServiceForm from "../service/ServicoForm.js";
import Message from '../layout/Message.js';
import ServicoCard from "../service/ServicoCard.js";

export default function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [service, setService] = useState([]);
  const [showProject, setShowProject] = useState(false);
  const [showServico, setShowServico] = useState(false);
  const [typeMessage, setTypeMessage] = useState();
  const [txtMessage, setTxtMessage] = useState();

  function reloadProject() {
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

    fetch("http://localhost:8080/servico", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const servicoFiltrado = data.filter((Servicos) => Servicos.projetoID == id)
        setService(servicoFiltrado);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Retorna o project por ID
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

  // Retorna todos os serviços
  useEffect(() => {
    fetch("http://localhost:8080/servico", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const servicoFiltrado = data.filter((Servicos) => Servicos.projetoID == id)
        setService(servicoFiltrado);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  function editPost(project) {
    setTxtMessage('');

    if (project.orcamento < project.totalUtilizado) {
      setTypeMessage('error');
      setTxtMessage('Custo abaixo do total utilizado');
      return false;
    }

    fetch(`http://localhost:8080/projeto/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
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

  function createService(service) {
    setTxtMessage('');

    if (project.totalUtilizado + service.custo > project.orcamento) {
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
      .then(() => {
        setShowServico(!showServico);
        setTypeMessage("sucess");
        setTxtMessage("Serviço criado com Sucesso!");
        reloadProject();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function removeService(id) {
    fetch(`http://localhost:8080/servico/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setService(service.filter((servico) => servico.id !== id));
        setTypeMessage("sucess");
        setTxtMessage("Serviço excluido com Sucesso!");
        reloadProject();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function toggleProjectForm() {
    setShowProject(!showProject);
  }

  function toggleServicoForm() {
    setShowServico(!showServico);
  }

  return (
    <>
      {!project.nome ? (
        <Loading />
      ) : (
        <div className={styles.project_details}>
          <Container customClass="column">
            <Message type={typeMessage} msg={txtMessage} />
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
                </div>
              }
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
                    handleRemove={removeService}
                    key={servico.id}
                  />
                )}
            </Container>
          </Container>
        </div>
      )}
    </>
  );
}
