import Image from "next/image";
import { Pokemon } from "../pages/team/create";

const PokemonCard = ({ pokemon, bottomContent }: { pokemon: Pokemon, bottomContent?: React.ReactNode }) => {
    const { name, image, power, types } = pokemon || {};
    return (
        <div
            className="pokemon-card max-h-48 flex flex-col rounded-lg bg-white  dark:bg-neutral-700 overflow-hidden"
        >
            <div className="relative">
                <div className="flex w-full align-center justify-center">
                    <Image
                        className="pokemon-image  absolute"
                        src={image}
                        width={100}
                        height={100}
                        alt=""
                    />
                </div>
            </div>
            <div className="flex flex-col h-full justify-end m-2">
                <h5
                    className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {name}
                </h5>
                <h4
                    className="text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    <b>Power:</b>{power}
                </h4>
                <div className="flex mt-2">

                    {types?.map(type =>
                        <h5
                            key={type}
                            className="border-solid border-2 border-gray-500 mr-1 p-1 rounded text-xs font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            <b>{type}</b>
                        </h5>
                    )}
                </div>
            </div>
            {bottomContent}
        </div>
    );
};

export default PokemonCard;
