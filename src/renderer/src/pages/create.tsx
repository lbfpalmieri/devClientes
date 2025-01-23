export function Create()
{

    async function handleAddCustomer(){

        const doc = {
            name: 'Creiso Teste',
            email: 'teste@teste.com',
            phone: '123456789',
            address: 'Rua teste, 123',
            role: 'admin',
            status: true,
        }

        const response = await window.api.addCustomer(doc)
        console.log(response)
    }

    return (
        <div>
            <h1>Criar clientes</h1>

            <button onClick={handleAddCustomer}>Adicionar cliente

            </button>
        </div>
    );
}