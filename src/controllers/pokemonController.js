import * as pokemonService from '../services/pokemonService.js';

// Home / list Pokémon
export const getHomePage = async (req, res) => {
  const types = await pokemonService.getPokemonTypes();
  const { type, page } = req.query;

  let pokemonData;
  if (type) {
    pokemonData = await pokemonService.getPokemonByType(type, page ? Number(page) : 1);
    if (!pokemonData) {
      pokemonData = { pokemon: [], totalCount: 0, currentPage: 1, totalPages: 1 };
    }
  } else {
    pokemonData = await pokemonService.getAllPokemon(page ? Number(page) : 1);
  }

  res.render('index', {
    pokemon: pokemonData.pokemon,
    types,
    searchQuery: '',
    selectedType: type || '',
    totalCount: pokemonData.totalCount,
    currentPage: pokemonData.currentPage,
    totalPages: pokemonData.totalPages
  });
};

// Pokémon details page
export const getPokemonDetails = async (req, res) => {
  const { nameOrId } = req.params;
  const pokemon = await pokemonService.getPokemonDetails(nameOrId);
  if (!pokemon) return res.status(404).render('error', { message: 'Pokémon not found', error: '' });

  const types = await pokemonService.getPokemonTypes();
  res.render('pokemonDetails', { pokemon, types });
};

// Type filter
export const getPokemonByType = async (req, res) => {
  const { type } = req.params;
  const { page } = req.query;
  const types = await pokemonService.getPokemonTypes();

  const pokemonData = await pokemonService.getPokemonByType(type, page ? Number(page) : 1);
  if (!pokemonData) {
    return res.render('index', { pokemon: [], types, searchQuery: '', selectedType: type, totalCount: 0, currentPage: 1, totalPages: 1 });
  }

  res.render('index', {
    pokemon: pokemonData.pokemon,
    types,
    searchQuery: '',
    selectedType: type,
    totalCount: pokemonData.totalCount,
    currentPage: pokemonData.currentPage,
    totalPages: pokemonData.totalPages
  });
};

// Search Pokémon
export const searchPokemon = async (req, res) => {
  const { q } = req.query;
  const types = await pokemonService.getPokemonTypes();
  const results = await pokemonService.searchPokemon(q);

  res.render('index', {
    pokemon: results.pokemon,
    types,
    searchQuery: q || '',
    selectedType: '',
    totalCount: results.totalCount,
    currentPage: 1,
    totalPages: 1
  });
};

// -------------------
// API routes
// -------------------
export const apiGetAllPokemon = async (req, res) => {
  const data = await pokemonService.getAllPokemon();
  res.json(data);
};
export const apiSearchPokemon = async (req, res) => {
  const { q } = req.query;
  const data = await pokemonService.searchPokemon(q);
  res.json(data);
};
export const apiGetPokemonDetails = async (req, res) => {
  const { nameOrId } = req.params;
  const data = await pokemonService.getPokemonDetails(nameOrId);
  if (!data) return res.status(404).json({ error: 'Pokémon not found' });
  res.json(data);
};
export const apiGetTypes = async (req, res) => {
  const data = await pokemonService.getPokemonTypes();
  res.json(data);
};
export const apiGetPokemonByType = async (req, res) => {
  const { type } = req.params;
  const data = await pokemonService.getPokemonByType(type);
  if (!data) return res.status(404).json({ error: 'No Pokémon found for this type' });
  res.json(data);
};