import { useEffect, useState } from "react";
import { getAllLegoSets } from "../services/legoService";
import LegoFilters from "../components/LegoFilters";
import LegoTable from "../components/LegoTable";
import { useNavigate } from "react-router-dom";

const LegoSets = () => {
    const [sets, setSets] = useState([]);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("name,asc");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getAllLegoSets({
                ...filters,
                sort
            });
            setSets(response.data);
        } catch (err) {
            console.error("Failed to fetch sets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters, sort]);

    return (
        <div>
            <div className="sets-header">
                <h2>Lego Sets Management</h2>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/create")}
                >
                    + Create New Set
                </button>
            </div>

            <LegoFilters onFilterChange={setFilters} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <LegoTable
                    sets={sets}
                    setSets={setSets}
                    sort={sort}
                    onSortChange={setSort}
                />
            )}
        </div>
    );
};

export default LegoSets;