import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Project(){

    const { id } = useParams();

    const [project, setProject] = useState([]);

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

    return(
        <p>{project.nome}</p>
    );
}