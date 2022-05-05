import useStateContext from '../hooks/useStateContext'

export default function Exam() {

    const { context, setContext } = useStateContext()
    console.log(context)

    return (
        <div>Exam</div>
    )
}
