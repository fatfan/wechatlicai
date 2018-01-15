import fetch from 'isomorphic-fetch'

export default async function request(url, data) {
    const response = await fetch(`/wechatlicai/src/datapi/${url}.cgi`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }

    const json = await response.json()
    return json
}
