import { useEffect, useState } from "react";
import { getAllLegoSets } from "../services/legoService";
import LegoFilters from "../components/LegoFilters";
import LegoTable from "../components/LegoTable";

const LegoSets = () => {
    const [sets, setSets] = useState([]);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("name,asc");
    const [loading, setLoading] = useState(false);

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