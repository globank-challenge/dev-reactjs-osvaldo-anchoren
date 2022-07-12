import React, { useEffect, useRef, useState, type FC } from 'react';
import { View } from 'react-native';
import { Snackbar, Button } from 'react-native-paper';
import { pokeApi } from '../api';

import { Pokedex, PokemonListType } from '../interfaces';
import { Loading } from './Loading';
import { Pokemon } from './Pokemon';

const limitPokemons = 151 // there is no more pokemons to me... also the app crash if you try to load too much :P

export const PokemonList:FC  = ({}) => {
    const [pokemons, setPokemons] = useState<PokemonListType[]>([])
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    const limit = useRef(20);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (offset + limit.current >= limitPokemons) {
            limit.current = limit.current - (offset + limit.current - limitPokemons); 
            console.log(limit.current);
        }

        pokeApi.get<Pokedex>(`/pokemon?limit=${limit.current}&offset=${offset}`).then( ({data}) => {
        const newPokemons: PokemonListType[] = data.results.map((p, index) => {return {
            name: p.name,
            desc: `Es el pokemon número ${pokemons.length + index + 1}, y se llama ${p.name}`,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemons.length + index + 1}.png`
        }})
        setPokemons([...pokemons , ...newPokemons]);
        setLoading(false);
      }).catch(err => {
        console.log(JSON.stringify(err));
        setSnackbarVisible(true);
      })
    }, [offset])

    const handleMore = ()  => {
        if(offset + limit.current >= limitPokemons){
            console.log("limit reached");
            return;
        }

        setOffset(offset + limit.current);
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