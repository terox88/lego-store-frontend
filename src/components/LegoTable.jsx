import { useNavigate } from "react-router-dom";
import { deleteLegoSet } from "../services/legoService";
import "../styles/table.css";
import {
    increaseWarehouse,
    decreaseWarehouse,
    increaseStore,
    decreaseStore
} from "../services/legoService";

const LegoTable = ({ sets, setSets, sort, onSortChange }) => {
    const navigate = useNavigate();

    const handleSort = (field) => {
        const [currentField, direction] = sort.split(",");
        const newDirection =
            currentField === field && direction === "asc"
                ? "desc"
                : "asc";

        onSortChange(`${field},${newDirection}`);
    };

    const renderSortIcon = (field) => {
        const [currentField, direction] = sort.split(",");
        if (currentField !== field) return "↕";
        return direction === "asc" ? "↑" : "↓";
    };

    const handleStockChange = async (id, type, action) => {
        try {
            const amount = 1;

            let response;

            if (type === "warehouse") {
                response = action === "increase"
                    ? await increaseWarehouse(id, amount)
                    : await decreaseWarehouse(id, amount);
            } else {
                response = action === "increase"
                    ? await increaseStore(id, amount)
                    : await decreaseStore(id, amount);
            }


            const updated = response.data;

            setSets(prev =>
                prev.map(s => s.id === id ? updated : s)
            );

        } catch (err) {
            alert("Failed to update stock");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this set?")) {
            return;
        }

        try {
            await deleteLegoSet(id);
            setSets(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            alert("Failed to delete set");
        }
    };

    return (
        <div className="table-wrapper">
            <table className="lego-table">
                <thead>
                <tr>
                    <th onClick={() => handleSort("name")}>
                        Name {renderSortIcon("name")}
                    </th>
                    <th>Set #</th>
                    <th onClick={() => handleSort("series")}>
                        Series {renderSortIcon("series")}
                    </th>
                    <th>Pieces</th>
                    <th>Stock</th>
                    <th onClick={() => handleSort("finalPrice")}>
                        Final Price {renderSortIcon("finalPrice")}
                    </th>
                    <th>Condition</th>
                    <th>Availability</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {sets.length === 0 ? (
                    <tr>
                        <td colSpan="9" className="empty-row">
                            No Lego sets found
                        </td>
                    </tr>
                ) : (
                    sets.map(set => (
                        <tr key={set.id}>
                            <td>{set.name}</td>
                            <td>{set.setNumber}</td>
                            <td>{set.series}</td>
                            <td>{set.numberOfPieces}</td>

                            <td>
                                <div className="stock-cell">

                                    <div className="stock-row">
                                        <span>WH: {set.quantityInWarehouse}</span>
                                        <div className="stock-buttons">
                                            <button
                                                onClick={() => handleStockChange(set.id, "warehouse", "increase")}
                                            >
                                                +
                                            </button>
                                            <button
                                                disabled={set.quantityInWarehouse === 0}
                                                onClick={() => handleStockChange(set.id, "warehouse", "decrease")}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>

                                    <div className="stock-row">
                                        <span>Store: {set.quantityInStore}</span>
                                        <div className="stock-buttons">
                                            <button
                                                onClick={() => handleStockChange(set.id, "store", "increase")}
                                            >
                                                +
                                            </button>
                                            <button
                                                disabled={set.quantityInStore === 0}
                                                onClick={() => handleStockChange(set.id, "store", "decrease")}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>

                                    <span className="stock-total">
      Total: {set.quantityTotal}
    </span>

                                </div>
                            </td>

                            <td>{set.finalPrice} PLN</td>

                            <td>
                                    <span className={`badge condition ${set.condition}`}>
                                        {set.condition}
                                    </span>
                            </td>

                            <td>
                                    <span className={`badge availability ${set.availabilityType}`}>
                                        {set.availabilityType}
                                    </span>
                            </td>

                            <td>
                                <button
                                    className="action-btn edit"
                                    onClick={() => navigate(`/edit/${set.id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="action-btn delete"
                                    onClick={() => handleDelete(set.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default LegoTable;