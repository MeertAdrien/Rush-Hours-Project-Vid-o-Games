import { useEffect, useState } from "react"
import { useParams } from "react-router"
import "./GameDataSheet.css"

interface ListOfVideoGames {
    id: number
    name: string
    genre: string
    developers: string
    publishers: string
    releaseDates: Record<string, string>
    image: string
}

export const GameDataSheet = () => {
    const { id } = useParams()
    const [GameDataSheet, setGameDataSheet] = useState<null | ListOfVideoGames>(null)

    useEffect(() => {
        async function fetchCharacter() {
            const response = await fetch(
                `https://api.sampleapis.com/playstation/games/${id}`
            )
            const result = await response.json()

            const images = [
                "https://cdn.prod.website-files.com/64c014cfbff33f53d39bd275/654121a5f5097e0ae491103f_Kill%20All%20Zombies%20AR%20.png",
                "https://image.api.playstation.com/cdn/EP4395/CUSA04692_00/1mmKdFK00ibRYBiJDNkzrPM7Ecj8yII7.png",
                "https://image.api.playstation.com/cdn/EP0473/CUSA06254_00/2VRkfqI17cq1ovYfNCXsjj8LVuy3OWZD.png",
                "https://image.api.playstation.com/cdn/EP0966/CUSA02850_00/8utivMHvlJAYEax78q92IrgHH79eMxqR.png",
                "https://image.api.playstation.com/cdn/EP0700/CUSA10148_00/kDaJmVMpJxYTnpK4or8tcLR9ozjGf1vV.png",
            ];

            if (result.id >= 1 && result.id <= 5) {
                result.image = images[result.id - 1];
            }

            setGameDataSheet(result)
        }
        fetchCharacter()
    }, [id])

    return (
        <>
            <h1>Game data ! {id}</h1>
            {GameDataSheet ? (
                <section>
                    <h1>{GameDataSheet.name}</h1>
                    <img
                        src={GameDataSheet.image || `https://picsum.photos/seed/${encodeURIComponent(GameDataSheet.name)}/400/300`}
                        alt={GameDataSheet.name}
                    />
                    <p>genre : {GameDataSheet.genre}</p>
                    <p>developper : {GameDataSheet.developers}</p>
                    <p>publishers : {GameDataSheet.publishers}</p>
                    <p className="release-title">Release Dates:</p>
                    <table className="release-table">
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(GameDataSheet.releaseDates).map(([region, date]) => (
                                <tr key={region}>
                                    <td>{region}</td>
                                    <td>{date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ) : (
                <section>This game is not here (yet)</section>
            )}
        </>
    )
}