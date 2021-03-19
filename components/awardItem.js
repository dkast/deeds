const AwardItem = props => {
  const { dataItem } = props;
  return (
    <div className="overflow-hidden shadow-lg rounded-lg mx-3">
      <div className="relative">
        <img src={dataItem.imageUrl} className="h-48 w-full object-cover" />
        <div className="text-white bg-orange-500 absolute top-0 right-0 rounded-bl-lg p-2 flex items-center">
          <img
            src="/static/images/gem.svg"
            className="w-4 h-4 mr-1"
            alt="coin"
          />
          <span className="font-bold">{dataItem.points}</span>
        </div>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
        {dataItem.description}
      </div>
    </div>
  );
};

export default AwardItem;
