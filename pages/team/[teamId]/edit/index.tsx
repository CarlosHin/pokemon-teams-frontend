import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import PokemonCard from "../../../../components/PokemonCard";
import { UserContext } from "../../../../components/UserContext";
import { config } from "../../../../config";
import MainLayout from "../../../layout";
import { Team } from "../../create";

function TeamEditPage() {
    const router = useRouter();
    const teamId = router.query.teamId;
    const { user } = useContext(UserContext);
    const [team, setTeam] = useState<Team>(undefined);

    const getTeams = async () => {
        const { data } = await axios.get(`${config.backendUrl}/private/teams`,
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            },
        );
        const findTeam = data.find(el => el._id === teamId)
        setTeam(findTeam)
    }
    useEffect(() => {
        user.name ? getTeams() : setTeam(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    const [teamName, setTeamName] = useState('');
    const handleTeamNameChange = (event) => {
        setTeamName(event.target.value);
    };
    const removePokemon = (index) => {
        const teamCopy = { ...team }
        teamCopy.pokemon_list.splice(index, 1);
        setTeam(teamCopy);
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
    const saveTeam = async () => {
        if (!confirm("Save team?")) return;
        const response = await axios.patch(`${config.backendUrl}/private/teams`,
            {
                team: { ...team, name: teamName || team.name },

            },
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                }
            },
        );
    }
    const removeTeam = async () => {
        if (!confirm("Remove team?")) return;
        const response = await axios.delete(`${config.backendUrl}/private/teams`,
            {
                data: { id: teamId },
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            },
        );
        if (response.status === 200) {
            alert("Team Removed");
            setTeam(undefined);
        }
    }



    return (
        <MainLayout>
            {team &&
                <div key={team.name} className="border-solid border-2 border-sky-100 p-10 mt-4">

                    <input
                        className="shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="teamName"
                        type="text"
                        placeholder={team.name}
                        onChange={handleTeamNameChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-10">
                        {team.pokemon_list?.map((pokemon, index) => (
                            <PokemonCard
                                key={pokemon.name}
                                pokemon={pokemon}
                                bottomContent={<>
                                    <button
                                        type="button"
                                        className="inline-block rounded-full bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium text-white"
                                        onClick={() => removePokemon(index)}

                                    >
                                        Remove
                                    </button>
                                </>
                                }
                            />
                        ))}
                    </div>
                    <p>
                        Total Power: {team.pokemon_list.reduce((total, el) => total + el.power, 0)}
                    </p>

                    {team?.pokemon_list?.length > 5 ?
                        <button
                            type="button"
                            className="inline-block rounded-full bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium text-white"
                            onClick={saveTeam}

                        >
                            Save
                        </button> :
                        <button
                            type="button"
                            className="inline-block rounded-full bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium text-white"
                            onClick={addPokemon}

                        >
                            Gotta Catch &apos;Em All
                        </button>
                    }
                    <button
                        type="button"
                        className="inline-block rounded-full bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium text-white"
                        onClick={removeTeam}

                    >
                        Remove Team
                    </button>
                </div>
            }
        </MainLayout >
    );
}

export default TeamEditPage;
