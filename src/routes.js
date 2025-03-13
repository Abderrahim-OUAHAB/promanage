import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";
import CreateProject from "layouts/dashboard/components/Projects/data/CreateProject";
import UpdateProject from "layouts/dashboard/components/Projects/data/UpdateProject";
import CreateTask from "layouts/dashboard/components/Tasks/data/CreateTask";
import UpdateTask from "layouts/dashboard/components/Tasks/data/UpdateTask";
import TaskList from "layouts/dashboard/components/Tasks/data/TaskList";
import Logout from "layouts/Deconnexion/Logout";
import Icon from "@mui/material/Icon";

const role = localStorage.getItem("role");
const isAdmin = role === "admin";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    protected: true,
  },
  isAdmin && {
    type: "collapse",
    name: "Créer un Projet",
    key: "create-project",
    icon: <Icon fontSize="small">add_task</Icon>,
    route: "/create-project",
    component: <CreateProject />,
    protected: true,
  },
  {
    route: "/update-project/:id",
    component: <UpdateProject />,
    protected: true,
  },
  isAdmin && {
    type: "collapse",
    name: "Créer une Tâche",
    key: "create-task",
    icon: <Icon fontSize="small">add_task</Icon>,
    route: "/create-task",
    component: <CreateTask />,
    protected: true,
  },
  {
    route: "/update-task/:id",
    component: <UpdateTask />,
    protected: true,
  },
  {
    route: "/projects/:id",
    component: <TaskList />,
    protected: true,
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
    protected: false,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
    protected: false,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Logout />,
    protected: true,
  },
];

export default routes;
