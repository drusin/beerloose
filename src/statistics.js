const SERVER_URL = "https://thumbnails.simon-lenz.de";

export async function sendStatistics({ username, score }) {
    const content = {
        username,
        score,
    }

    const response = await fetch(`${SERVER_URL}/submit-statistics`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
    return await response.json();
}

export async function getStatistics() {
    const resp = await fetch(`${SERVER_URL}/statistics`);
    const result = await resp.json();
    return result;
}