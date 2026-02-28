import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LegoForm from "../components/LegoForm";
import { getLegoSetById, createLegoSet, updateLegoSet } from "../services/legoService";

const LegoFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            getLegoSetById(id)
                .then(res => setInitialData(res.data))
                .catch(() => alert("Failed to load set"));
        }
    }, [id, isEdit]);

    const handleSubmit = async (formData) => {
        if (isEdit) {
            await updateLegoSet(id, formData);
        } else {
            await createLegoSet(formData);
        }
        navigate("/");
    };

    if (isEdit && !initialData) return <p>Loading...</p>;

    return (
        <LegoForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isEdit={isEdit}
        />
    );
};

export default LegoFormPage;