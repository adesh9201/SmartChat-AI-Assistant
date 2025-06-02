import axios from 'axios';

export const getDefinition = async (req, res) => {
    try {
        const { word } = req.params;
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        const definitions = response.data[0].meanings.map(meaning => ({
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map(def => ({
                definition: def.definition,
                example: def.example || null
            }))
        }));

        res.json({
            word,
            phonetic: response.data[0].phonetic,
            definitions
        });
    } catch (error) {
        res.status(404).json({ message: 'Word not found' });
    }
};