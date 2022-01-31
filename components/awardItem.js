const AwardItem = props => {
  const { dataItem } = props;
  return (
    <div className="mx-3 overflow-hidden rounded-lg shadow">
      <div className="relative bg-gradient-to-t from-indigo-400 via-pink-500 to-orange-500 p-1">
        <img
          src={dataItem.imageUrl}
          className="h-48 w-full rounded object-cover"
        />
        <div className="absolute top-0 right-0 flex items-center rounded-bl-lg bg-orange-500 p-2 text-white">
          <img
            src="/static/images/gem.svg"
            className="mr-1 h-4 w-4"
            alt="coin"
          />
          <span className="font-bold">{dataItem.points}</span>
        </div>
        <div className="absolute bottom-0 left-0 flex h-1/2 w-full items-end bg-gradient-to-t from-indigo-700 to-transparent p-4 text-gray-200">
          <span className="font-bold">{dataItem.description}</span>
        </div>
      </div>
    </div>
  );
};

export default AwardItem;
