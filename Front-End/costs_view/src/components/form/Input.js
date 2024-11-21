import styles from './Input.module.css';

export default function Input({type, text, name, placeholder, handleOnChange, value, maxLength, minLength, min,}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                maxLength={maxLength}
                minLength={minLength}
                min={min}
                required
            />
        </div>
    )
}