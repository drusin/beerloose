const SERVER_URL = "http://rusin.xyz:5555";

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
    console.log(await response.json());
}

export async function getStatistics() {
    const resp = await fetch(`${SERVER_URL}/statistics`);
    const result = await resp.json();
    return result;
}