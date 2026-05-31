

import { useForm } from "react-hook-form"

export const FormularioCliente = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <form onSubmit={handleSubmit(handleSubmit)}>
            <input type="text" 
                placeholder="Nombre"     
                {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && <p>{errors.nombre.message}</p>}
            <input
                type="number"
                placeholder="Edad"
                {...register("edad", { required: "La edad es obligatorio" })}
            />
            {errors.edad && <p>{errors.edad.message}</p>}
            <input
                type="text"
                placeholder="Grupo"
                {...register("grupo", { required: "El grupo es obligatorio" })}
            />
            {errors.grupo && <p>{errors.grupo.message}</p>}
            <button type="submit">Agregar cliente</button>
        </form>
    )
}
