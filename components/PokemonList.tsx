import React, { useEffect, useState, type FC } from 'react';
import { View, Text } from 'react-native';
import { Snackbar, Button } from 'react-native-paper';
import { pokeApi } from '../api';

import { Pokedex, PokemonListType } from '../interfaces';
import { Loading } from './Loading';
import { Pokemon } from './Pokemon';

export const PokemonList:FC  = ({}) => {
    const [pokemons, setPokemons] = useState<PokemonListType[]>([])
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        pokeApi.get<Pokedex>(`/pokemon?limit=${limit}&offset=${offset}`).then( ({data}) => {
        const newPokemons: PokemonListType[] = data.results.map((p, index) => {return {
            name: p.name,
            desc: `Es el pokemon número ${pokemons.length + index + 1}, y se llama ${p.name}`,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemons.length + index + 1}.png`
        }})
        setPokemons([...pokemons , ...newPokemons]);
        setLoading(false);
        console.log(pokemons);
      }).catch(err => {
        console.log(JSON.stringify(err));
        setSnackbarVisible(true);
      })
    }, [offset])

    const handleMore = ()  => {
        setOffset(offset + limit);
        setLoading(true);
    }
    

    return (
        <View>
            {pokemons.map(({name, desc, image}) => (
                <Pokemon key={name} title={name} desc={desc} image={image} />
            ))}
            {loading ? (<Loading />) : null}

            {!loading ? (<Button onPress={handleMore}>Más Pokemons!</Button>) : null}
            
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