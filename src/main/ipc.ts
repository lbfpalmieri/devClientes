import { ipcMain } from 'electron'

//handle é um método que cria um listener para uma requisição
ipcMain.handle('fetch-users', () => {
    console.log("BUSCANDO USUARIOS...")
    return [
        {id: 1, name: 'Alice' },
        {id: 2, name: 'Bob' },
        {id: 3, name: 'Charlie' },
    ]
})