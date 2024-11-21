import { useState } from 'react';

import Input from '../form/Input.js';
import SubmitButton from '../form/SubmitButton.js';
import styles from './ServicoForm.module.css';

export default function ServiceForm({ btnText, handleSubmit, projectData }) {
    const [project, setProject] = useState(projectData);
    const [servico, setServico] = useState({
        nome: '',
        descricao: '',
        custo: '',
        projetoID: project.id || ''
    });


    const submit = (e) => {
        e.preventDefault();
        handleSubmit(servico);
    }

    function handleChange(e) {
        setServico({ ...servico, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Serviço"
                name="nome"
                value={servico.nome}
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
                maxLength={100}
                minLength={3}
            />

            <Input
                type="text"
                text="Descrição do Serviço"
                name="descricao"
                value={servico.descricao}
                placeholder="Insira a descrição do serviço"
                handleOnChange={handleChange}
                maxLength={50}
                minLength={3}
            />

            <Input
                type="number"
                text="Custo do Serviço"
                name="custo"
                value={servico.custo}
                handleOnChange={handleChange}
                placeholder="Insira o custo do serviço"
                min={0}
            />

            <Input
                type="hidden"
                name="projetoID"
                value={project.id}
            />

            <SubmitButton text={btnText} />
        </form>
    );
}
