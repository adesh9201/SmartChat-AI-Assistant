const PluginCard = ({ pluginName, data }) => {
    const renderContent = () => {
        switch (pluginName) {
            case 'weather':
                return (
                    <div className="bg-white border rounded-lg p-4 shadow-md w-64">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg">
                                {data.city}, {data.country}
                            </h3>
                            <img
                                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                                alt={data.description}
                                className="w-12 h-12"
                            />
                        </div>
                        <div className="mt-2">
                            <p className="text-3xl font-bold">{Math.round(data.temp)}°C</p>
                            <p className="text-gray-600 capitalize">{data.description}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Feels like {Math.round(data.feels_like)}°C
                            </p>
                        </div>
                    </div>
                );

            case 'calc':
                return (
                    <div className="bg-white border rounded-lg p-4 shadow-md w-64">
                        <h3 className="font-bold text-lg mb-2">Calculator</h3>
                        <div className="flex justify-between items-baseline">
                            <span className="text-gray-600">{data.expression} =</span>
                            <span className="text-2xl font-bold">{data.result}</span>
                        </div>
                    </div>
                );

            case 'define':
                return (
                    <div className="bg-white border rounded-lg p-4 shadow-md w-64">
                        <h3 className="font-bold text-lg mb-2">
                            {data.word}
                            {data.phonetic && <span className="text-gray-600 ml-2">/{data.phonetic}/</span>}
                        </h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {data.definitions.slice(0, 3).map((meaning, idx) => (
                                <div key={idx}>
                                    <p className="text-sm font-semibold text-gray-500">
                                        {meaning.partOfSpeech}
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                                        {meaning.definitions.slice(0, 2).map((def, i) => (
                                            <li key={i} className="break-words">
                                                {def.definition}
                                                {def.example && (
                                                    <p className="text-gray-500 italic text-xs">e.g. {def.example}</p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return <div>Unknown plugin response</div>;
        }
    };

    return (
        <div className="bg-gray-100 rounded-lg p-2">
            {renderContent()}
        </div>
    );
};

export default PluginCard;