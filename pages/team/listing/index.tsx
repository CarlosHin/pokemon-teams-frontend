import axios from 'axios';
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import PokemonCard from '../../../components/PokemonCard';
import { UserContext } from '../../../components/UserContext';
import { config } from '../../../config';
import MainLayout from '../../layout';
import { Team } from '../create';

export default function Create() {
    const { user } = useContext(UserContext);
    const [teams, setTeams] = useState<Team[]>([]);
    const getTeams = async () => {
        const { data } = await axios.get(`${config.backendUrl}/private/teams`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                }
            },
        );
        setTeams(data)
    }
    useEffect(() => {
        user.name ? getTeams() : setTeams([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <MainLayout>
            {teams.map(team => (<div key={team.name} className="border-solid border-2 border-sky-100 p-10 mt-4">
                <p>
                    {team.name}
                </p>
                <Link href={`/team/${team._id}/edit`}>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-10">
                    {team.pokemon_list?.map(pokemon => (
                        <PokemonCard
                            key={pokemon.name}
                            pokemon={pokemon}
                        />
                    ))}
                </div>
                <p>
                    Total Power: {team.pokemon_list.reduce((total, el) => total + el.power, 0)}
                </p>
            </div>
            ))
            }
        </MainLayout >
    )
}
