import Link from "next/link";
import { useContext } from "react";
import LoginButton from "../components/LoginButton";
import { UserContext } from "../components/UserContext";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const { user, setUser } = useContext(UserContext);

    return (
        <section className='p-8'>
            <div className='mb-8' >
                {!user?.name ?
                    <LoginButton />
                    :
                    <div className="flex gap-2">
                        <Link href="/team/listing">

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Listing
                            </button>
                        </Link>
                        <Link href="/team/create">

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Create
                            </button>
                        </Link>
                        <button
                            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setUser({})}
                        >
                            Log Out
                        </button>
                    </div>
                }
            </div >

            {children}
        </section>
    );
}