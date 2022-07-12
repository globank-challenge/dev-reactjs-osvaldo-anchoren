/**
 * Pokedex app
 * 
 * @format
 */

import React from 'react';

import { BasicLayout, Header, PokemonList } from './components'; 


const App = () => {
  return (
    <BasicLayout>
      <Header />
      <PokemonList />
    </BasicLayout>
  );
};

export default App;
