import { app, ipcMain } from 'electron'
import PouchDB from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'
import { Custumer, NewCustumer } from '../shared/types/ipc'
import { randomUUID } from 'node:crypto'    

// Determinar o caminho base para o campo de dados com base no sistema operacional
let dbPath;

if(process.platform === "darwin"){
    // Caminho para o diretório de dados do usuário no macOS
    dbPath = path.join(app.getPath('appData'), 'devclientes', 'my_db')
}else{
    // Caminho para o diretório de dados do usuário no Windows
    dbPath = path.join(app.getPath('userData'), 'my_db')
}

//Verificar e criar o diretório se nào existir
const dbDir = path.dirname(dbPath)
if(!fs.existsSync(dbDir)){
    fs.mkdirSync(dbDir, { recursive: true })
}

// Inicializar o DB
const db = new PouchDB<Custumer>(dbPath)

//Função para adicionar um Banco
async function addCustumer(doc: NewCustumer): Promise<PouchDB.Core.Response | void> {
    const id = randomUUID();

    const data: Custumer = {
        _id: id,
        ...doc
    }

    return db.put(data)
        .then(response => response)
        .catch(err => console.log("ERRO AO CADASTRAR", err))
}

ipcMain.handle('add-customer', async (event, doc: Custumer) => {
    const result = await addCustumer(doc);
    return result;
})

//Função para buscar todos os clientes
async function fetchAllCustomers(): Promise<Custumer[]> {
   try{
         const result = await db.allDocs({include_docs: true})
        return result.rows.map(row => row.doc as Custumer)
   }catch(err){
         console.log("ERRO AO BUSCAR CLIENTES", err)
         return[]
   }
}

ipcMain.handle('fetch-all-customers', async () => {
    return await fetchAllCustomers();
})