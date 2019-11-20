const fs = require('fs')
const os = require('os')
const json2xls = require('json2xls')


// function to write to file
module.exports.printToFile = file => {
    // months
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    // create a new directory
    const pathToHomeDir = os.homedir()
    let fullYear = new Date().getFullYear()
    let fullMonth = monthNames[new Date().getMonth()]
    const newDirYear = `${pathToHomeDir}\\Yellow Pages Digital & Media Solutions Limited\\Olivier Lambert - DATA GOVERNANCE\\CONTENT INJECTION\\INJECTED\\${fullYear}`
    const newDirMonth = `${newDirYear}\\${fullMonth}`
    const merchandName = file.merchandName
    const dirpath = `${newDirMonth}\\${merchandName}`

    fs.mkdirSync(newDirYear, { recursive: true })
    fs.mkdirSync(newDirMonth, { recursive: true })
    fs.mkdirSync(dirpath, { recursive: true })
    // write CI csv
    fs.writeFile(`${dirpath}\\${file.filename}`, file.csv, err => {
        if (err) throw err
        if (file.toAnvagD.length === 0) return
        const xls = json2xls(file.toAnvagD)
        // write anvag-d file
        fs.writeFileSync(`${dirpath}\\${file.merchandName}_anvagD.xlsx`, xls, 'binary', err => {
            if (err) throw err
        })
    })
    return {
        merchandName,
        dirpath,
        creationDate: new Date()
    }
}