import React, { useEffect, useState, type FC } from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { pokeApi } from '../api';

import { Pokedex, PokemonListType } from '../interfaces';
import { Loading } from './Loading';
import { Pokemon } from './Pokemon';

export const PokemonList:FC  = ({}) => {
    const [pokemons, setPokemons] = useState<PokemonListType[]>([])
    const [snackbarVisible, setSnackbarVisible] = useState(false)

    useEffect(() => {
      pokeApi.get<Pokedex>('/pokemon?limit=100000&offset=0').then( ({data}) => {
        const newPokemons: PokemonListType[] = data.results.map((p, index) => {return {
            name: p.name,
            desc: `Es el pokemon numero ${index+1}, y se llama ${p.name}`,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index+1}.png`
        }})
        setPokemons(newPokemons);
      }).catch(err => {
        setSnackbarVisible(true);
      })
    }, [])
    

    return (
        <View>
            {!pokemons.length ? (<Loading />) : null}
            {pokemons.map(({name, desc, image}) => (
                <Pokemon key={name} title={name} desc={desc} image={image} />
            ))}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => {}}
                action={{
                label: 'Ok',
                onPress: () => {
                    setSnackbarVisible(false);
                } }}>
                Ops! Error del servidor!
            </Snackbar>
        </View>
    )};