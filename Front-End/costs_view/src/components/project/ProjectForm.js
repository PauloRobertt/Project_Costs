import { useState } from 'react';

import Input from '../form/Input.js';
import Select from '../form/Select.js';
import SubmitButton from '../form/SubmitButton.js';
import styles from './ProjectForm.module.css'

export default function ProjectForm({btnText, handleSubmit, projectData}){
    const [project, setProject] = useState(projectData || {})

    const submit = (e) =>{
        e.preventDefault();
        handleSubmit(project)
        console.log(project);
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, categoria: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do Projeto" 
                name="nome"
                placeholder="Insira o nome do projeto"
                maxLength={100}
                minLength={3}
                handleOnChange={handleChange}
            />
            <Input 
                type="number" 
                text="Orçamento do Projeto" 
                name="orcamento"
                placeholder="Insira o orçamento total"
                min={0}
                handleOnChange={handleChange}
            />
            <Select 
                name="categoria" 
                text="Selecione a categoria" 
                handleOnChange={handleCategory}
                value={project.categoria || ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    );
}