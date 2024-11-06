import styles from './Select.module.css';

export default function Select({text, name}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name}>
                <option disabled selected>Selecione uma opção</option>
                <option value="Infra">Infra</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Design">Design</option>
                <option value="Planejamento">Planejamento</option>
            </select>
        </div>
    )
}