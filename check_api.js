const checkApi = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/components');
        const data = await response.json();
        console.log(JSON.stringify(data.slice(0, 1), null, 2)); // Print first component
    } catch (error) {
        console.error(error);
    }
};

checkApi();
