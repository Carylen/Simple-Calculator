
const Numbers = (props) => {
    return(
        <button className={props.class} onClick={props.onClick}>{props.val}</button>
    )
}

export default Numbers