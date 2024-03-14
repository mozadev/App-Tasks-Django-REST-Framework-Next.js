import FormTask from "./components/FormTasks";
import ListTask from "./components/ListTask";

function Home() {
  return (
    <div className="container mx-auto">
      <h1>Task App</h1>
      <div className="flex gap-x 10">
        <FormTask />
        <ListTask />
      </div>
    </div>

  )
}

export default Home;