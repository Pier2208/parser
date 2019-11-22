const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')

// config log debugging
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'debug'

// enable auto downloading of updates
autoUpdater.autoDownload = true

module.exports = () => {
    //check for updates (Github releases)
    autoUpdater.checkForUpdates()

    // listen for update downloaded
    autoUpdater.on('update-downloaded', (versionInfo) => {
        // prompt the user to install the update
        dialog.showMessageBox({
            type: 'info',
            title: 'Update',
            message: `A new version ${versionInfo.version} is available. Please close and restart the program.`,
            buttons: ['OK']
        }, result => {
            // Install and restart if button 0 (OK)
            if (result === 0) {
                // isSilent / isForceRunAfter
                autoUpdater.quitAndInstall(false, true)
            }
        })
    })
}