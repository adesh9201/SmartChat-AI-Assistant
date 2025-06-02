const Message = ({ sender, content }) => {
    return (
        <div
            className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
        >
            {content}
        </div>
    );
};

export default Message;