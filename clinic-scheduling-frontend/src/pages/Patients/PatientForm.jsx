import { useForm } from 'react-hook-form';

export default function PatientForm({ initial = {}, onSubmit}) {
    const { register, handleSubmit, reset, formState} = useForm({
        defaultValues: {
            nome: initial.nome || '',
            cpf: initial.cpf || '',
            celular: initial.celular || '',
            idade: initial.idade || '',
        }
    })

    function submit(data) {
        onSubmit && onSubmit(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="form-grid">
                <label>
                    Nome
                    <input 
                        {...register('nome', { required: true})} 
                        type="text" 
                        placeholder="Nome completo" 
                        aria-label="nome" 
                    />
                </label>

                <label>
                    CPF
                    <input 
                        {...register('cpf', { required: true})} 
                        type="text" 
                        placeholder="CPF" 
                        aria-label="cpf" 
                    />
                </label>

                <label>
                    Celular
                    <input 
                        {...register('celular', { required: true})} 
                        type="text" 
                        placeholder="Celular" 
                        aria-label="celular" 
                    />
                </label>

                <label>
                    Idade
                    <input 
                        {...register('idade', { required: true})} 
                        type="number" 
                        placeholder="Idade" 
                        aria-label="idade" 
                    />
                </label>
            </div>

            <div>
                <button type="submit" className="btn btn-primary" aria-disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
}










