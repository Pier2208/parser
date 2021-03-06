const { Parser } = require('json2csv')

module.exports.processToCSV = arr => {
    const fields = Object.keys(arr[0][0])
    let filename = arr[2]
    let merchandName =  arr[3]
    const json2csvParser = new Parser({ fields, withBOM: true  })
    const csv = json2csvParser.parse(arr[0])
    return {
        csv,
        toAnvagD: arr[1],
        filename,
        merchandName,
    }
}