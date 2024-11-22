import { Link } from 'react-router-dom';
import styles from './ServicoCard.module.css';

import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

export default function ServicoCard({id, nome, descricao, custo, handleRemove}){

    function remove(e){
        e.preventDefault();
        handleRemove(id);
    }

    return(
        <div className={styles.project_card}>
            <h4>{nome}</h4>
            <p>
                <span>custo:</span> R${custo}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[descricao.toLowerCase()]}`}></span> {descricao}
            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>Excluir
                </button>
            </div>
        </div>
    );
}
