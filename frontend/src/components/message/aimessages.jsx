import { useForm } from "react-hook-form"

const aimessages = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const handlequestion = (question) => {
        console.log(question);
        reset();
    }

    return (
        <div className="bg-black">
            yash
        </div>
    )
}

export default aimessages