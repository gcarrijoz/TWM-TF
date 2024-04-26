import styles from './Input.module.css'

function Input({label, type, name, placeholder, onChange, value, required, readOnly} ){
    return(
        <div className={styles.box_input}>
            <label htmlFor="">{label}:</label>
            <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} {...(required && { required: true })} {...(readOnly && { readOnly: true })} />
        </div>
    )
}

export default Input