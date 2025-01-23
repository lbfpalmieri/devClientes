import { Menu, Tray, nativeImage, BrowserWindow } from 'electron';
import path from 'node:path'

export function createTray(window: BrowserWindow){
    const appIcon = path.join(__dirname, 'resources', 'menuTemplate.png')
    let icon = nativeImage.createFromPath(appIcon)

    const tray = new Tray(icon)

    const menu = Menu.buildFromTemplate([
        { label: 'Dev Clientes', enabled: false },
        { type: 'separator' },
        { label: 'Cadastrar Cliente', 
            click:() => {
                //Enviar mensagem do processo (main) para o processo frontend (renderer)
                window.webContents.send('new-customer')
                if(window.isMinimized()) window.restore();
                window.focus();
            } 
        },
        { type: 'separator' },
        { label: 'Abrir', click: () => window.show() },
        { label: 'Ocultar', click: () => window.hide() },
        { label: 'Fechar', role: 'quit' }
    ])

    tray.setToolTip('Dev Clientes')

    tray.setContextMenu(menu);
}