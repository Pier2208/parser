const os = require('os')
const moment = require('moment')
const XLSX = require('xlsx')

const { PAYMENTS_METHS, LANGUAGES } = require('../data')


module.exports = {
    hoursFormater: hours => {
        let oneliner = ''
        if (Object.values(hours).reduce((acc, val) => acc + val, []).length === 0) {
            return oneliner
        } else {
            for (let key in hours) {
                oneliner += `${key.substr(-3).toLowerCase()}##${hours[key].replace('-', '##')}|`
            }
            let newOneliner = oneliner.substr(0, oneliner.length - 1)
            if (newOneliner === 'mon##00:00##00:00|tue##00:00##00:00|wed##00:00##00:00|thu##00:00##00:00|fri##00:00##00:00|sat##00:00##00:00|sun##00:00##00:00') {
                newOneliner = 'Labels##24/7'
            }
            return newOneliner
        }
    },

    paymentsFormater: payments => {
        let payment_methods = []
        payments.forEach(pay => {
            for (let key in PAYMENTS_METHS) {
                if (key === pay) {
                    payment_methods.push(PAYMENTS_METHS[key])
                }
            }
        })
        return payment_methods.join('|')
    },

    langFormatter: languages => {
        let languages_spoken = []
        languages.forEach(lang => {
            for (let key in LANGUAGES) {
                if (key === lang) {
                    languages_spoken.push(LANGUAGES[key])
                }
            }
        })
        return languages_spoken.join('|')
    },

    socialsFormater: socials => {
        let socialOneliner = ''
        for (let key in socials) {
            if (socials[key]) {
                if (key !== 'OtherSocial') {
                    socialOneliner += `[${key}]${socials[key]}|`
                } else {
                    let others = socials[key].replace(/ /g, '').split('|')
                    others.forEach(url => {
                        if (url.includes('linkedin')) {
                            socialOneliner += `[Linkedin]${url}|`
                        }
                        else if (url.includes('pinterest')) {
                            socialOneliner += `[Pinterest]${url}|`
                        } else {
                            socialOneliner += `[OtherSocial]${url}|`
                        }
                    })
                }
            }
        }
        const newOneliner = socialOneliner.substr(0, socialOneliner.length - 1)
        return newOneliner
    },

    isFrenchLanguage: str => str.match(/[éàèùâêîôûçëïü]/i),

    websiteFormatter: websites => {
        let oneliner = ''
        if (websites.EN && !websites.FR) {
            if (websites.EN.match(/\/fr/g)) {
                oneliner += `[FR]${websites.EN}`
            } else {
                oneliner += `${websites.EN}`
            }
        }
        if (!websites.EN && websites.FR) {
            oneliner += `[FR]${websites.FR}`
        }
        if (websites.EN && websites.FR) {
            oneliner += `[EN]${websites.EN}|[FR]${websites.FR}`
        }
        return oneliner
    },

    addSignatureNational: () => `National##${os.userInfo().username}##${moment().format('L')}`,

    stringFormatter: str => str ? str.replace(/, /g, ',').split(',').join('|') : '',

    numberFormatter: num => (num / 1000).toFixed(3),

    extractMerchandName: filename => {
        const start_pos = filename.indexOf('_') + 1;
        const end_pos = filename.indexOf('_', start_pos);
        const text_to_get = filename.substring(start_pos, end_pos)
        return text_to_get
    },

    excelToJson: path => {
        // get workbook
        const wb = XLSX.readFile(path)
        // get worksheet_name
        const ws_name = wb.SheetNames[0]
        // get worksheet
        const ws = wb.Sheets[ws_name]
        // to JSON
        const wsJSON = XLSX.utils.sheet_to_json(ws)
        return wsJSON
    },

    compose: (...fns) => input => fns.reduceRight((acc, fn) => fn(acc), input)
}