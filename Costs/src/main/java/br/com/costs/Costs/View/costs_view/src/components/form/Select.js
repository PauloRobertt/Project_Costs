import styles from './Select.module.css';

export default function Select({text, name, options, handleOnChange, value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name}>
                <option disabled selected>Selecione uma opção</option>
            </select>
        </div>
    )
}