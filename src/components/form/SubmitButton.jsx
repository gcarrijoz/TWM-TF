import styles from './SubmitButton.module.css'

function SubmitButton({text}){
    return(
        <div className={styles.box_btn}>
            <button>{text}</button>
        </div>
    )
}

export default SubmitButton