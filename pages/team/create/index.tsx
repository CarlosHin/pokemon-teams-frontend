import axios from 'axios';
import { useContext, useState } from 'react';
import PokemonCard from '../../../components/PokemonCard';
import { UserContext } from '../../../components/UserContext';
import { config } from '../../../config';
import MainLayout from '../../layout';

export interface Pokemon {
    name: string;
    image: string;
    power: number;
    types: string[];

}
export interface Team {
    _id?: string;
    name: string;
    pokemon_list?: Pokemon[];
}
export default function Create() {
    const { user } = useContext(UserContext);
    const [isCreated, setIsCreated] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [team, setTeam] = useState<Team>(undefined);

    const createTeamName = () => {
        if (!user.name) return alert("Please log in first");
        if (!teamName) return alert("Set a valid team name");
        setIsCreated(false)
        setTeam({
            name: teamName,
            pokemon_list: []
        })
    }

    const addPokemon = async () => {
        if (!user.name) return alert("Please log in first");
        if (!team) return alert("Create a team first");
        if (team?.pokemon_list?.length > 5) return alert("A team con only have 6 pokemons");
        const min = 1;
        const max = 151;
        const rand: number = Math.floor(min + Math.random() * (max - min));
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${rand}`);
        setTeam({
            ...team,
            pokemon_list: [
                ...team.pokemon_list,
                {
                    name: data.name,
                    image: data.sprites.front_default,
                    power: data.base_experience,
                    types: data.types.map(type => type.type.name)
                }
            ]
        })
    }

    const createTeam = async () => {
        if (!user.name) return alert("Please log in first");
        if (!team) return alert("Create a team first");
        const response = await axios.post(`${config.backendUrl}/private/teams`,
            { team },
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`, // agregar el token JWT en el encabezado "Authorization"
                },
            },
        );
        if (response.status === 200) {
            alert("Team Created");
            setIsCreated(true);
        }

    }

    const handleTeamNameChange = (event) => {
        setTeamName(event.target.value);
    };
    return (
        <MainLayout>
            <input
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="teamName"
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={handleTeamNameChange}
            />
            <button
                type="button"
                className="inline-block rounded-full bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium text-white"
                onClick={createTeamName}
            >
                Create team
            </button>

            {!isCreated && team && <div className="border-solid border-2 border-sky-100 p-10 mt-4">
                <p>
                    Team {team.name}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-10">
                    {team.pokemon_list?.map(pokemon => (
                        <PokemonCard
                            key={pokemon.name}
                            pokemon={pokemon}
                        />
                    ))}
                </div>

                {team?.pokemon_list?.length > 5 ?
                    <button
                        type="button"
                        className="inline-block rounded-full bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium text-white"
                        onClick={createTeam}

                    >
                        Save Team
                    </button> :
                    <button
                        type="button"
                        className="inline-block rounded-full bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium text-white"
                        onClick={addPokemon}

                    >
                        Gotta Catch &apos;Em All
                    </button>
                }
            </div>
            }
        </MainLayout>
    )
}
