
import styles from './ItemLista.module.css'
import LinkButton from './LinkButton';

function ItemLista({id, nome, categoria, produto, tecnico, status, semBtn, editarOrdem, onExcluir, destinoEditar}) {   

    const handleExcluirClick = () => {
        onExcluir(id);
    };

    const getStatusColorClass = (status) => {
        switch(status) {
            case 'Em andamento':
                return styles.statusAndamento;
            case 'Aberta':
                return styles.statusAberto;
            case 'Concluida':
                return styles.statusConcluido;
            default:
                return styles.statusAndamento;
        }
    };

    return(
        <div className={styles.box_item}>
            <div>
                <span>#{id}</span>
            </div>
            <div>
                <span>{nome}</span>
            </div>
            {categoria && ( // Verifica se categoria existe
                <div>
                    <span>{categoria}</span>
                </div>
            )}
            {tecnico && (
                <div>
                    <span>{tecnico}</span>
                </div>
            )}
            {produto && (
                <div>
                    <span>{produto}</span>
                </div>
            )}
            {status && (
                <div>
                    {/* Adicione a classe de cor com base no status */}
                    <span className={`${styles.status} ${getStatusColorClass(status)}`}>{status}</span>
                </div>
            )}
            {!semBtn && (
                <div className={styles.div_botoes}>
                    <LinkButton tipo="box_btn_editar" destino={destinoEditar} text="EDITAR"/>
                    <button onClick={handleExcluirClick}>EXCLUIR</button>
                </div>

            )}  

            {editarOrdem && (
                <div className={styles.div_botoes}>
                    <LinkButton tipo="box_btn_editar" destino={destinoEditar} text="EDITAR"/>
                </div>

            )}             

        </div>
    )
}

export default ItemLista