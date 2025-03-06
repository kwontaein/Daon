'use server'

export const userIdDuplicationChecked = async(userId:string):Promise<boolean|null>=>{
    return fetch("http://localhost:8080/api/duplicationCheck", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
        cache:'no-store'
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json()
    }).catch((error) => {
        console.error('Error:', error)
    })
}