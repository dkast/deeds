const Deed = () => (
  <div className="rounded-lg shadow-lg bg-white">
    <div className="flex p-2">
      <div className="relative py-1 px-3">
        <img
          src="/static/images/toothbrush.svg"
          className="w-20 h-20"
          alt="icon"
        />
        <img
          src="/static/images/avatars/mario-run.jpg"
          className="rounded-full h-10 w-10 object-cover absolute bottom-0 right-0 border-2 border-white"
          alt="Avatar"
        />
      </div>
      <div className="mx-4 my-2 flex flex-col justify-between flex-grow">
        <div className="text-indigo-600 text-lg">
          <span className="font-bold mr-1">Diego</span>
          <span>se cepilló los dientes.</span>
        </div>
        <div className="flex items-center h-5 self-end">
          <img src="/static/images/coin.svg" className="w-5 h-5" alt="coin" />
          <span className="ml-2 tracking-tight font-bold text-orange-500">
            10 puntos
          </span>
        </div>
      </div>
    </div>
    <div className="rounded-bl-lg rounded-br-lg bg-indigo-600 h-1"></div>
  </div>
);

export default Deed;
