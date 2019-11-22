const sanitize = require("sanitize-filename")
const {
    hoursFormater,
    paymentsFormater,
    langFormatter,
    socialsFormater,
    websiteFormatter,
    addSignatureNational,
    stringFormatter,
    numberFormatter,
    isFrenchLanguage
} = require('./utilities')

module.exports.processJSON = file => {
    const transformed_JSON = []
    const toAnvagD = []
    let count = 0
    let merchandName = file[0]['Name EN'] ? sanitize(file[0]['Name EN']) : sanitize(file[0]['Name FR'])
  
    for (let obj of file) {
        if (obj.ACTION === 'UPDATE') {
            count++
            let newObj = {}
            // MID --> MID
            newObj.MID = obj.MID
            // Name EN --> NAME_EN
            newObj.NAME_EN = (!obj['Name EN']) ? '' : obj['Name EN']
            // Name FR --> NAME_FR
            newObj.NAME_FR = (!obj['Name FR']) ? '' : obj['Name FR']
            // Description EN --> DESCRIPTION_EN | DESCRIPTION_EN_SOURCE
            if (obj['Description EN']) {
                if (isFrenchLanguage(obj['Description EN'])) {
                    newObj.DESCRIPTION_EN = ''
                    newObj.DESCRIPTION_EN_SOURCE = ''
                    newObj.DESCRIPTION_FR = obj['Description EN']
                    newObj.DESCRIPTION_FR_SOURCE = addSignatureNational()
                } else {
                    newObj.DESCRIPTION_EN = obj['Description EN']
                    newObj.DESCRIPTION_EN_SOURCE = addSignatureNational()
                }
            } else {
                newObj.DESCRIPTION_EN = ''
                newObj.DESCRIPTION_EN_SOURCE = ''
            }
            // Description FR --> DESCRIPTION_FR | DESCRIPTION_FR_SOURCE
            if (!('DESCRIPTION_FR' in newObj)) {
                newObj.DESCRIPTION_FR = obj['Description FR'] ? obj['Description FR'] : ''
                newObj.DESCRIPTION_FR_SOURCE = (!obj['Description FR']) ? '' : addSignatureNational()
            }
            // Email --> PUBLIC_EMAIL_EN | PUBLIC_EMAIL_EN_SOURCE
            newObj.PUBLIC_EMAIL_EN = obj['Email'] ? obj['Email'] : ''
            newObj.PUBLIC_EMAIL_EN_SOURCE = (!obj['Email']) ? '' : addSignatureNational()
            // Courriel --> PUBLIC_EMAIL_FR | PUBLIC_EMAIL_FR_SOURCE
            newObj.PUBLIC_EMAIL_FR = obj['Courriel'] ? obj['Courriel'] : ''
            newObj.PUBLIC_EMAIL_FR_SOURCE = (!obj['Courriel']) ? '' : addSignatureNational()
            // Website --> HOME_PAGE | HOME_PAGE_SOURCE
            let websites = ((
                {
                    Website: EN,
                    'Site Web': FR
                }) => ({
                    EN,
                    FR
                }))(obj)
            newObj.HOME_PAGE = websiteFormatter(websites) ? websiteFormatter(websites) : ''
            newObj.HOME_PAGE_SOURCE = websiteFormatter(websites) ? addSignatureNational() : ''
            // Facebook/Twitter/YouTube/Other Social URLs --> SOCIAL_URLS | FACEBOOK_URL_SOURCE
            let socials = ((
                {
                    Facebook,
                    Twitter,
                    YouTube,
                    'Other Social URLs': OtherSocial
                }) => ({
                    Facebook,
                    Twitter,
                    YouTube,
                    OtherSocial
                }))(obj)

            newObj.SOCIAL_URLS = socialsFormater(socials)
            newObj.FACEBOOK_URL_SOURCE = socialsFormater(socials) ? addSignatureNational() : ''
            // HOURS_MON/HOURS_TUE/HOURS_WED/HOURS_THU/HOURS_FRI/HOURS_SAT/HOURS_SUN --> HOURS_OF_OPERATION_SOURCE | HOURS_OF_OPERATION
            let hours = ((
                {
                    HOURS_MON,
                    HOURS_TUE,
                    HOURS_WED,
                    HOURS_THU,
                    HOURS_FRI,
                    HOURS_SAT,
                    HOURS_SUN
                }) => ({
                    HOURS_MON,
                    HOURS_TUE,
                    HOURS_WED,
                    HOURS_THU,
                    HOURS_FRI,
                    HOURS_SAT,
                    HOURS_SUN
                }))(obj)
            newObj.HOURS_OF_OPERATION = hoursFormater(hours)
            newObj.HOURS_OF_OPERATION_SOURCE = hoursFormater(hours) ? addSignatureNational() : ''
            // Payment Methods --> PAYMENT_METHODS | PAYMENT_METHODS_SOURCE
            newObj.PAYMENT_METHODS = obj['Payment Methods'] ? paymentsFormater(obj['Payment Methods'].split('|')) : ''
            newObj.PAYMENT_METHODS_SOURCE = obj['Payment Methods'] ? addSignatureNational() : ''
            // Languages Spoken --> LANGUAGES_SPOKEN | LANGUAGES_SPOKEN_SOURCE
            newObj.LANGUAGES_SPOKEN = obj['Languages Spoken'] ? langFormatter(obj['Languages Spoken'].split('|')) : ''
            newObj.LANGUAGES_SPOKEN_SOURCE = obj['Languages Spoken'] ? addSignatureNational() : ''
            // Products & Services --> PRODUCT_SERVICES_EN | PRODUCT_SERVICES_EN_SOURCE
            if (obj['Products & Services']) {
                if (isFrenchLanguage(obj['Products & Services'])) {
                    newObj.PRODUCT_SERVICES_EN = ''
                    newObj.PRODUCT_SERVICES_EN_SOURCE = ''
                    newObj.PRODUCT_SERVICES_FR = stringFormatter(obj['Products & Services'])
                    newObj.PRODUCT_SERVICES_FR_SOURCE = addSignatureNational()
                } else {
                    newObj.PRODUCT_SERVICES_EN = stringFormatter(obj['Products & Services'])
                    newObj.PRODUCT_SERVICES_EN_SOURCE = addSignatureNational()
                }
            } else {
                newObj.PRODUCT_SERVICES_EN = ''
                newObj.PRODUCT_SERVICES_EN_SOURCE = ''
            }
            // Produits & Services --> PRODUCT_SERVICES_FR | PRODUCT_SERVICES_FR_SOURCE
            if (!('PRODUCT_SERVICES_FR' in newObj)) {
                newObj.PRODUCT_SERVICES_FR = obj['Produits et Services'] ? stringFormatter(obj['Produits et Services']) : ''
                newObj.PRODUCT_SERVICES_FR_SOURCE = (!obj['Produits et Services']) ? '' : addSignatureNational()
            }
            // Brands --> BRANDS_CARRIED_EN | BRANDS_CARRIED_EN_SOURCE
            newObj.BRANDS_CARRIED_EN = (!obj['Brands']) ? '' : stringFormatter(obj['Brands'])
            newObj.BRANDS_CARRIED_EN_SOURCE = (!obj['Brands']) ? '' : addSignatureNational()
            // Marques --> BRANDS_CARRIED_FR | BRANDS_CARRIED_FR_SOURCE
            newObj.BRANDS_CARRIED_FR = (!obj['Marques']) ? '' : stringFormatter(obj['Marques'])
            newObj.BRANDS_CARRIED_FR_SOURCE = (!obj['Marques']) ? '' : addSignatureNational()
            // Features --> ATTRIBUTES_EN | ATTRIBUTES_EN_SOURCE
            newObj.ATTRIBUTES_EN = (!obj['Features']) ? '' : stringFormatter(obj['Features'])
            newObj.ATTRIBUTES_EN_SOURCE = (!obj['Features']) ? '' : addSignatureNational()
            // Caractéristiques --> ATTRIBUTES_FR | ATTRIBUTES_FR_SOURCE
            newObj.ATTRIBUTES_FR = (!obj['Caractéristiques']) ? '' : stringFormatter(obj['Caractéristiques'])
            newObj.ATTRIBUTES_FR_SOURCE = (!obj['Caractéristiques']) ? '' : addSignatureNational()
            // Specialties --> OTHER_RELEVANT_EN_KEYWORDS | OTHER_RELEVANT_KEYWORDS_EN_SRC
            if (obj['Specialties']) {
                if (isFrenchLanguage(obj['Specialties'])) {
                    newObj.OTHER_RELEVANT_EN_KEYWORDS = ''
                    newObj.OTHER_RELEVANT_KEYWORDS_EN_SRC = ''
                    newObj.OTHER_RELEVANT_KEYWORDS_FR = stringFormatter(obj['Specialties'])
                    newObj.OTHER_RELEVANT_KEYWORDS_FR_SRC = addSignatureNational()
                } else {
                    newObj.OTHER_RELEVANT_EN_KEYWORDS = stringFormatter(obj['Specialties'])
                    newObj.OTHER_RELEVANT_KEYWORDS_EN_SRC = addSignatureNational()
                }
            } else {
                newObj.OTHER_RELEVANT_EN_KEYWORDS = ''
                newObj.OTHER_RELEVANT_KEYWORDS_EN_SRC = ''
            }
            // Specialités --> OTHER_RELEVANT_KEYWORDS_FR | OTHER_RELEVANT_KEYWORDS_FR_SRC
            if (!('OTHER_RELEVANT_KEYWORDS_FR' in newObj)) {
                newObj.OTHER_RELEVANT_KEYWORDS_FR = obj['Specialités'] ? stringFormatter(obj['Specialités']) : ''
                newObj.OTHER_RELEVANT_KEYWORDS_FR_SRC = (!obj['Specialités']) ? '' : addSignatureNational()
            }
            // Images --> IMAGES | IMAGES_SOURCE
            newObj.IMAGES = (!obj['Images']) ? '' : obj['Images']
            newObj.IMAGES_SOURCE = (!obj['Images']) ? '' : addSignatureNational()
            // PUSH TO 
            transformed_JSON.push(newObj)
        } else if (obj.ACTION === 'ADD' || obj.ACTION === 'DELETE' || obj.ACTION === 'REMOVE' || obj.ACTION === 'DUPLICATE' || obj.ACTION === 'OOB' ) {
            toAnvagD.push(obj)
        }
    }
    let filename = `ContentInjection_${merchandName}_${numberFormatter(count)}K_UTF-8.csv`
    return [
        transformed_JSON, // array of objects (CI)
        toAnvagD, // array of objects (anvag-D)
        filename, // ContentInjection_NAME_LINES_UTF-8.csv
        merchandName // ex: Pharmaprix
    ]
}