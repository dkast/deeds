const AwardItem = props => {
  const { dataItem } = props;
  return (
    <div className="overflow-hidden shadow rounded-lg mx-3">
      <div className="relative bg-gradient-to-t from-indigo-400 via-pink-500 to-red-500">
        <img
          src={dataItem.imageUrl}
          className="h-48 w-full object-cover mix-blend-overlay"
        />
        <div className="text-white bg-orange-500 absolute top-0 right-0 rounded-bl-lg p-2 flex items-center">
          <img
            src="/static/images/gem.svg"
            className="w-4 h-4 mr-1"
            alt="coin"
          />
          <span className="font-bold">{dataItem.points}</span>
        </div>
        <div className="p-4 flex items-end bg-gradient-to-t from-purple-700 to-transparent text-gray-200 absolute bottom-0 left-0 w-full h-1/2">
          <span className="font-bold">{dataItem.description}</span>
        </div>
      </div>
    </div>
  );
};

export default AwardItem;
