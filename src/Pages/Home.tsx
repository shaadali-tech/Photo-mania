import MainLayout from "@/Layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div className="p-10">
        <h1 className="text-4xl font-bold">Welcome to Photoholic</h1>

        <p className="text-zinc-400 mt-4">
          Your social media app is now working 🚀
        </p>
      </div>
    </MainLayout>
  );
};

export default Home;
