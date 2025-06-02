export const calculate = async (req, res) => {
    try {
        const { expression } = req.params;
        // Basic safety check
        if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
            return res.status(400).json({ message: 'Invalid expression' });
        }

        const result = new Function(`return ${expression}`)();
        res.json({ expression, result });
    } catch (error) {
        res.status(400).json({ message: 'Error evaluating expression' });
    }
};