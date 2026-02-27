import { useEffect, useState } from "react";
import api from "../api/axios";

function LegoSets() {
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const cellStyle = {
        border: "1px solid #ddd",
        padding: "8px"
    };

    useEffect(() => {
        fetchSets();
    }, []);

    const fetchSets = async () => {
        try {
            const response = await api.get("/api/lego-sets");
            setSets(response.data);
        } catch (error) {
            console.error("Error fetching lego sets", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Lego Sets</h2>

            {sets.length === 0 ? (
                <p>No lego sets found.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Set Number</th>
                        <th>Pieces</th>
                        <th>Warehouse</th>
                        <th>Store</th>
                        <th>Price</th>
                        <th>Series</th>
                        <th>Condition</th>
                        <th>Availability</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sets.map((set) => (
                        <tr key={set.id}>
                            <td>{set.id}</td>
                            <td style={cellStyle}>{set.name}</td>
                            <td>{set.setNumber}</td>
                            <td>{set.numberOfPieces}</td>
                            <td>{set.quantityInWarehouse}</td>
                            <td>{set.quantityInStore}</td>
                            <td>{set.basePrice}</td>
                            <td>{set.series}</td>
                            <td>{set.condition}</td>
                            <td>{set.availabilityType}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default LegoSets;