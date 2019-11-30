const os = require('os')
const fs = require('fs')
const fetch = require('node-fetch')
const FormData = require('form-data')
const { extractMerchandName } = require('./utilities')

module.exports.createJira = async ({ filename, filepath, password }) => {
    const merchandName = extractMerchandName(filename)
    const username = os.userInfo().username

    try {
        const form = new FormData()
        const formHeaders = form.getHeaders()
        form.append('file', fs.createReadStream(filepath))
    
        const bodyData = {
            "fields": {
                "project":
                {
                    "key": "EBOS",
                    "name": "SPI - ESB-BPM Operation",
                },
                "summary": `[Content Injection NATIONAL] ${merchandName}`,
                "description": `Hello, please upload this batch of content for ${merchandName}, thanks!`,
                "issuetype": {
                    "id": "3"
                },
                "customfield_14510": {
                    "name": "OPEX"
                },
                "customfield_10411": {
                    "value": "Sev 2 - Major"
                },
                "customfield_14715": {
                    "value": "Enterprise Service Bus (ESB)"
                },
                "customfield_11011": "DPST-166",
                "priority": {
                    "name": "P2 - High"
                }
            }
        }
    
        const res = await fetch('https://issues.ypg.com/rest/api/2/issue', {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
            }
        })
        const jiraResponseText = await res.text()
        const jiraResponse = await JSON.parse(jiraResponseText)
    
        const issueId = jiraResponse.id
        const issueKey = jiraResponse.key
    
        const attachmentResponse = await fetch(`https://issues.ypg.com/rest/api/2/issue/${issueId}/attachments`, {
            method: 'POST',
            body: form,
            headers: {
                ...formHeaders,
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
                'X-Atlassian-Token': 'nocheck'
            }
        })
        const attachmentResponseText = await attachmentResponse.text()
        await JSON.parse(attachmentResponseText)
    
        // POST /rest/api/2/issue/{issueIdOrKey}/watchers
        await fetch(`https://issues.ypg.com/rest/api/2/issue/${issueId}/watchers`, {
            method: 'POST',
            body: `"${username}"`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
            }
        })
    
        await fetch(`https://issues.ypg.com/rest/api/2/issue/${issueId}/watchers`, {
            method: 'POST',
            body: `"olambert"`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
            }
        })
    
        const jiraData = {
            success: true,
            merchandName,
            filepath,
            issueKey,
            url: `https://issues.ypg.com/browse/${issueKey}`,
            creationDate: new Date()
        }
        return jiraData
    } catch (err) {
        console.log(err)
        return 'Authentication failed. Re-enter password.'
    }
}
