export interface Pokedex {
    count:    number;
    next:     string;
    previous: null;
    results:  Poke[];
}

export interface Poke {
    name: string;
    url:  string;
}
