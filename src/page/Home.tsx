import { useEffect, useState } from "react"
import { Link } from "react-router"

interface ListOfVideoGames {
    id: number
    name: string
    genre: string
    developers: string
    publishers: string
    releaseDates: Record<string, string>
    image: string
}

export const Home = () => {
    const [VideoGames, setVideoGames] = useState<ListOfVideoGames[]>([]);

    useEffect(() => {
        async function getVideoGames() {
            try {
                const response = await fetch(
                    "https://api.sampleapis.com/playstation/games"
                );
                const result = await response.json();

                const images = [
                    "https://cdn.prod.website-files.com/64c014cfbff33f53d39bd275/654121a5f5097e0ae491103f_Kill%20All%20Zombies%20AR%20.png",
                    "https://image.api.playstation.com/cdn/EP4395/CUSA04692_00/1mmKdFK00ibRYBiJDNkzrPM7Ecj8yII7.png",
                    "https://image.api.playstation.com/cdn/EP0473/CUSA06254_00/2VRkfqI17cq1ovYfNCXsjj8LVuy3OWZD.png",
                    "https://image.api.playstation.com/cdn/EP0966/CUSA02850_00/8utivMHvlJAYEax78q92IrgHH79eMxqR.png",
                    "https://image.api.playstation.com/cdn/EP0700/CUSA10148_00/kDaJmVMpJxYTnpK4or8tcLR9ozjGf1vV.png",
                ];


                for (let i = 0; i < 5; i++) {
                    if (result[i]) {
                        result[i] = {
                            ...result[i],
                            image: images[i]
                        };
                    }
                }

                setVideoGames(result);
            } catch (e) {
                console.error("Error fetching characters:", e);
            }
        }

        getVideoGames();
    }, []);

    return (
        <>
            <h1>PlayStation Games</h1>
            <h2>Video games on the PlayStation 4</h2>
            <ul>
                {VideoGames.map((game) => (
                    <li key={`game-${game.id}`}>
                        <Link to={`/game/${game.id}`}>
                            <h2>{game.name}</h2>
                            <img
                                src={game.image || `https://picsum.photos/seed/${encodeURIComponent(game.name)}/400/300`}
                                alt={game.name}
                                style={{ borderRadius: "8px", marginBottom: "10px" }}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};