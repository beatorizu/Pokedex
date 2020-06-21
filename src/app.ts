const TOTAL_OF_POKEMON: number = 100;
const getPokemonUrl = (id: any): string => `https://pokeapi.co/api/v2/pokemon/${id}`

const container: HTMLElement | any = document.getElementById('app')

interface IPokemon {
  id: number,
  name: string,
  image: string,
  type: string
}

const fetchPokemon = async (id: number): Promise<void> => {
  const response: Response = await fetch(getPokemonUrl(id))
  const pokemon: any = await response.json()
  const pokemonTypes: string = pokemon.types.map(({ type: { name } }: any) => name).join(', ')

  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonTypes
  }

  showPokemon(transformedPokemon)
}

const fetchData = (): void => {
  for (let i = 1; i < TOTAL_OF_POKEMON; i++) {
    fetchPokemon(i);
  }
}

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `<div class="card">
		<span class="card--id">#${pokemon.id}</span>
		<img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
		<span class="card--details">${pokemon.type}</span>
  </div>`
  container.innerHTML += output
}

fetchData()
