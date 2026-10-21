type Recipe = {
  userId: number
}

type Birthdate = {
  birthDate: string
}


async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url)
    const object = await response.json()
    return object
}


async function getChefBirthday(id : number): Promise<string> {
    try {
        const recipeResponse = await fetchJson<Recipe>(`https://dummyjson.com/recipes/${id}`)
        const recipeId = recipeResponse.userId
        const infoChef = await fetchJson<Birthdate>(`https://dummyjson.com/users/${recipeId}`)
        const birthday = infoChef.birthDate
        return birthday
    } catch (error) {
        throw error
    }
}


(async () => {
    try {
        const birthdayChef = await getChefBirthday(1)
        console.log("Data di nascita dello chef:", birthdayChef);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(`Errore sconosciuto: ${error}`)
      }
    }
    
}) ()