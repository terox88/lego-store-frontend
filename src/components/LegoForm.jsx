import { useState, useEffect } from "react";
import "../styles/form.css";

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

const LegoForm = ({ initialData, onSubmit, isEdit }) => {

    const [form, setForm] = useState({
        name: "",
        setNumber: "",
        numberOfPieces: 1,
        numberOfBoxes: 1,
        quantityInWarehouse: 0,
        quantityInStore: 0,
        basePrice: 0,
        series: "CITY",
        condition: "NEW",
        discontinued: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                discontinued: initialData.discontinued ?? false
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let newValue = value;

        if (type === "number") {
            newValue = value === "" ? "" : Number(value);

            if (!isEdit) {
                if (name === "numberOfPieces" || name === "numberOfBoxes") {
                    if (newValue < 1) newValue = 1;
                }

                if (name === "quantityInWarehouse" || name === "quantityInStore") {
                    if (newValue < 0) newValue = 0;
                }
            }

            if (name === "basePrice" && newValue < 0) {
                newValue = 0;
            }
        }

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!form.name.trim()) {
            setError("Name cannot be blank");
            return;
        }

        if (Number(form.basePrice) < 0) {
            setError("Base price must be non-negative");
            return;
        }

        if (!isEdit) {
            if (!form.setNumber.trim()) {
                setError("Set number cannot be blank");
                return;
            }

            if (Number(form.numberOfPieces) <= 0) {
                setError("Number of pieces must be greater than 0");
                return;
            }

            if (Number(form.numberOfBoxes) <= 0) {
                setError("Number of boxes must be greater than 0");
                return;
            }

            if (Number(form.quantityInWarehouse) < 0) {
                setError("Warehouse quantity cannot be negative");
                return;
            }

            if (Number(form.quantityInStore) < 0) {
                setError("Store quantity cannot be negative");
                return;
            }
        }

        let payload;

        if (isEdit) {

            payload = {
                name: form.name,
                basePrice: Number(form.basePrice),
                condition: form.condition,
                discontinued: form.discontinued
            };
        } else {

            payload = {
                name: form.name,
                setNumber: form.setNumber,
                numberOfPieces: Number(form.numberOfPieces),
                numberOfBoxes: Number(form.numberOfBoxes),
                quantityInWarehouse: Number(form.quantityInWarehouse),
                quantityInStore: Number(form.quantityInStore),
                basePrice: Number(form.basePrice),
                series: form.series,
                condition: form.condition
            };
        }

        try {
            setLoading(true);
            await onSubmit(payload);
        } catch (err) {
            setError("Failed to save set");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">
            <h2>{isEdit ? "Edit Lego Set" : "Create Lego Set"}</h2>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="form-grid">

                <div className="form-section">
                    <h3>Basic Information</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        {!isEdit && (
                            <div className="form-group">
                                <label>Set Number</label>
                                <input
                                    name="setNumber"
                                    value={form.setNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-row">
                        {!isEdit && (
                            <div className="form-group">
                                <label>Series</label>
                                <select
                                    name="series"
                                    value={form.series}
                                    onChange={handleChange}
                                >
                                    {SERIES.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Condition</label>
                            <select
                                name="condition"
                                value={form.condition}
                                onChange={handleChange}
                            >
                                {CONDITIONS.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {!isEdit && (
                    <>
                        <div className="form-section">
                            <h3>Product Details</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Number of Pieces</label>
                                    <input
                                        type="number"
                                        name="numberOfPieces"
                                        min="1"
                                        step="1"
                                        value={form.numberOfPieces}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Number of Boxes</label>
                                    <input
                                        type="number"
                                        name="numberOfBoxes"
                                        min="1"
                                        step="1"
                                        value={form.numberOfBoxes}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Stock</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Warehouse Quantity</label>
                                    <input
                                        type="number"
                                        name="quantityInWarehouse"
                                        min="0"
                                        step="1"
                                        value={form.quantityInWarehouse}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Store Quantity</label>
                                    <input
                                        type="number"
                                        name="quantityInStore"
                                        min="0"
                                        step="1"
                                        value={form.quantityInStore}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="form-section">
                    <h3>Pricing</h3>

                    <div className="form-group">
                        <label>Base Price (PLN)</label>
                        <input
                            type="number"
                            name="basePrice"
                            min="0"
                            step="0.01"
                            value={form.basePrice}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {isEdit && (
                    <div className="form-section">
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="discontinued"
                                    checked={form.discontinued}
                                    onChange={handleChange}
                                />
                                Discontinued
                            </label>
                        </div>
                    </div>
                )}

                <button className="primary-btn" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>

            </form>
        </div>
    );
};

export default LegoForm;