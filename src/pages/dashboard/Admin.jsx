import { useAuth } from "../../contexts/Auth.jsx";
import Jumbotron from "../../components/cards/Jumbotron.jsx";
import AdminMenu from "../../components/nav/AdminMenu.jsx";
import Menu from "../../components/nav/NavBar";
import SideNav from "../../components/nav/SideNav.jsx";

const AdminDashboard = () => {
  // context
  const { auth, setAuth } = useAuth();

  return (
    <>
      <Menu />
      <SideNav />
      <Jumbotron
        title={`Hello ${auth?.user?.name || "Admin"}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Information</div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Designation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{auth?.user?.name}</td>
                  <td>admin@demo.com</td>
                  <td>Super Admin</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Ademola Kuku</td>
                  <td>admin2@email.com</td>
                  <td>Marketing Head</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry Gaga</td>
                  <td>adminhr@email.com</td>
                  <td>Human resource</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
