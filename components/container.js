const Container = (props) => (
  <main className="self-stretch flex-1 mx-auto w-full md:w-1/2">
    <div className="pt-32 pb-32">{props.children}</div>
  </main>
);

export default Container;
