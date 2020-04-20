const SERVER_URL = "http://rusin.xyz:5555";

export async function sendStatistics({ username, score }) {
    const content = {
        username,
        score,
    }

    await fetch(`${SERVER_URL}/submit-statistics?username=${username}&score=${score}`);
}

export async function getStatistics() {
    const resp = await fetch(`${SERVER_URL}/statistics`);
    const result = await resp.json();
    return result;
}