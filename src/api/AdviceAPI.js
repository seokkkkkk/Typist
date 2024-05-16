import axios from "axios";

function AdviceAPI() {
    const fetchAdvice = async () => {
        try {
            const response = await axios.get(
                "https://api.adviceslip.com/advice"
            );
            if (response && response.data && response.data.slip) {
                return [response.data.slip.id, response.data.slip.advice];
            } else {
                throw new Error("No slip data received");
            }
        } catch (error) {
            console.error("Failed to fetch advice:", error);
            return []; // Return an empty array or appropriate error handling
        }
    };

    const fetchAdviceById = async (id) => {
        try {
            const response = await axios.get(
                `https://api.adviceslip.com/advice/${id}`
            );
            if (response && response.data && response.data.slip) {
                return response.data.slip.advice;
            } else {
                throw new Error("No slip data received");
            }
        } catch (error) {
            console.error("Failed to fetch advice by ID:", error);
            return ""; // Return an empty string or appropriate error handling
        }
    };

    return {
        fetchAdvice,
        fetchAdviceById,
    };
}

export default AdviceAPI;
