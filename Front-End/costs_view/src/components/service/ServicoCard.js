import styles from './ServicoCard.module.css';

import { BsFillTrashFill } from 'react-icons/bs';

export default function ServicoCard({id, nome, descricao, custo, handleRemove}){

    function remove(e){
        e.preventDefault();
        handleRemove(id);
    }

    return(
        <div className={styles.service_card}>
            <h4>{nome}</h4>
            <p>
                <span>custo:</span> R${custo}
            </p>
            <p className={styles.category_text}>
                {descricao}
            </p>
            <div className={styles.service_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>Excluir
                </button>
            </div>
        </div>
    );
}
