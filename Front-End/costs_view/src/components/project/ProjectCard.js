import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

export default function ProjectCard({id, nome, orcamento, categoria, handleRemove}){
    return(
        <div className={styles.project_card}>
            <h4>{nome}</h4>
            <p>
                <span>Orçamento:</span> R${orcamento}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[categoria.toLowerCase()]}`}></span> {categoria}
            </p>
            <div className={styles.project_card_actions}>
                <Link to="/">
                    <BsPencil/>Editar
                </Link>
                <button>
                    <BsFillTrashFill/>Excluir
                </button>
            </div>
        </div>
    );
}
