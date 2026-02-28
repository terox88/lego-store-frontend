import { useState } from "react";

const SERIES = [
    "STAR_WARS",
    "TECHNIC",
    "CREATOR",
    "CITY",
    "NINJAGO",
    "HARRY_POTTER",
    "MARVEL",
    "ICONS",
    "ARCHITECTURE"
];

const CONDITIONS = [
    "NEW",
    "EXHIBITION",
    "DAMAGED_BOX"
];

const AVAILABILITY_TYPES = [
    "IN_STORE_ONLY",
    "SHIPPING_ONLY",
    "IN_STORE_AND_SHIPPING",
    "NOT_AVAILABLE"
];

const LegoFilters = ({ onFilterChange }) => {

    const [localFilters, setLocalFilters] = useState({
        series: "",
        condition: "",
        minPrice: "",
        maxPrice: "",
        availabilityType: "",
        discontinued: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLocalFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        const cleaned = {};

        Object.entries(localFilters).forEach(([key, value]) => {

            if (value === "" || value === null || value === undefined) {
                return;
            }

            // konwersja liczb
            if (key === "minPrice" || key === "maxPrice") {
                cleaned[key] = Number(value);
                return;
            }

            // konwersja boolean
            if (key === "discontinued") {
                cleaned[key] = value === "true";
                return;
            }

            cleaned[key] = value;
        });

        onFilterChange(cleaned);
    };

    const resetFilters = () => {
        const empty = {
            series: "",
            condition: "",
            minPrice: "",
            maxPrice: "",
            availabilityType: "",
            discontinued: ""
        };

        setLocalFilters(empty);
        onFilterChange({});
    };

    return (
        <div style={{ marginBottom: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>

            <select name="series" value={localFilters.series} onChange={handleChange}>
                <option value="">All series</option>
                {SERIES.map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <select name="condition" value={localFilters.condition} onChange={handleChange}>
                <option value="">All conditions</option>
                {CONDITIONS.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select
                name="availabilityType"
                value={localFilters.availabilityType}
                onChange={handleChange}
            >
                <option value="">All availability</option>
                {AVAILABILITY_TYPES.map(a => (
                    <option key={a} value={a}>{a}</option>
                ))}
            </select>

            <select
                name="discontinued"
                value={localFilters.discontinued}
                onChange={handleChange}
            >
                <option value="">All</option>
                <option value="true">Discontinued</option>
                <option value="false">Active</option>
            </select>

            <input
                type="number"
                name="minPrice"
                placeholder="Min price"
                value={localFilters.minPrice}
                min="0"
                step="0.01"
                onChange={handleChange}
            />

            <input
                type="number"
                name="maxPrice"
                placeholder="Max price"
                value={localFilters.maxPrice}
                min="0"
                step="0.01"
                onChange={handleChange}
            />

            <button onClick={applyFilters}>
                Apply
            </button>

            <button onClick={resetFilters} type="button">
                Reset
            </button>

        </div>
    );
};

export default LegoFilters;