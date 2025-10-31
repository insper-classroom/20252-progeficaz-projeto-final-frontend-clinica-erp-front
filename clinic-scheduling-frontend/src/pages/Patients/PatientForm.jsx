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

    async function submit(data) {
        if (!onSubmit) {
            reset();
            return;
        }

        try {
            // Await the parent's onSubmit in case it performs async work (e.g. POST request)
            await onSubmit(data);
            // Only reset the form after successful submit
            reset();
        } catch (err) {
            // Let the parent handle/log the error. We don't reset so the user can correct/try again.
            console.error('Erro no submit do formulário:', err);
        }
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
                <button type="submit" className="btn btn-primary" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? 'Enviando...' : 'Cadastrar paciente'}
                </button>
            </div>
        </form>
    );
}










