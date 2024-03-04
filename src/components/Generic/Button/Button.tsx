type Props = {
    label: string
    color: string
}

const Button = ({ label, color }: Props) => {
    return (
        <button className={`button bg${color}`}>{label}</button>
    )
}

export default Button;