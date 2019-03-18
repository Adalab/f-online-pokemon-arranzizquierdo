const ENDPOINT="https://pokeapi.co/api/v2/pokemon?limit=25";

const fetchReason = () => fetch(ENDPOINT).then(response => response.json());

export { fetchReason };