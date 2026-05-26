import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import "../../styles/superadminpanel.css"

function SuperAdminPanel() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 8;

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const res = await api.get(
          "/admin/users"
        );

        setUsers(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchUsers();

  }, []);

  const filteredUsers = users.filter(
  (user) => {

    const matchesSearch =

      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      user.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesRole =

      roleFilter === "all"
        ? true
        : user.role === roleFilter;

    return (
      matchesSearch &&
      matchesRole
    );
  }
);

const indexOfLastUser =
  currentPage * usersPerPage;

const indexOfFirstUser =
  indexOfLastUser - usersPerPage;

const currentUsers =
  filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

const totalPages = Math.ceil(
  filteredUsers.length /
  usersPerPage
);

  const handleRoleChange = async (
  userId,
  newRole
) => {

  try {

    await api.put(
      `/admin/users/${userId}/role`,
      {
        role: newRole
      }
    );

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId
          ? {
              ...user,
              role: newRole
            }
          : user
      )
    );

    toast.success(
      "Rol actualizado"
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Error actualizando rol"
    );
  }
};

const handleToggleBlock = async (
  userId
) => {

  try {

    const res = await api.put(
      `/admin/users/${userId}/block`
    );

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId
          ? {
              ...user,
              isBlocked:
                !user.isBlocked
            }
          : user
      )
    );

    toast.success(
      res.data.msg
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Error actualizando usuario"
    );
  }
};

  return (

    <div className="super-admin-panel">

      <h1>
        Super Admin Panel
      </h1>

      <div className="users-toolbar">

  <input
    type="text"
    placeholder="Buscar usuario..."
    value={search}
    onChange={(e) => {

  setSearch(e.target.value);

  setCurrentPage(1);
}}
    className="users-search"
  />

  <select
    value={roleFilter}
    onChange={(e) => {

  setRoleFilter(
    e.target.value
  );

  setCurrentPage(1);
}}
    className="users-filter"
  >

    <option value="all">
      Todos
    </option>

    <option value="user">
      Users
    </option>

    <option value="admin">
      Admins
    </option>

    <option value="superadmin">
      Superadmins
    </option>

  </select>

</div>

      <div className="users-table">

        <div className="users-header">
          <span>Nombre</span>
          <span>Email</span>
          <span>Rol</span>
          <span>Estado</span>
          <span>Creado</span>
        </div>

        {currentUsers.map((user) => (

          <div
            key={user._id}
            className="users-row"
          >

            <span>
              {user.name}
            </span>

            <span>
              {user.email}
            </span>

           {user.role === "superadmin" ? (

  <span
    className={`role-badge ${user.role}`}
  >
    superadmin
  </span>

) : (

  <select
    value={user.role}
    onChange={(e) =>
      handleRoleChange(
        user._id,
        e.target.value
      )
    }
    className={`role-select ${user.role}`}
  >

    <option value="user">
      user
    </option>

    <option value="admin">
      admin
    </option>

  </select>
)}

<button
  onClick={() =>
    handleToggleBlock(user._id)
  }
  className={
    user.isBlocked
      ? "unblock-btn"
      : "block-btn"
  }
>

  {user.isBlocked
    ? "Desbloquear"
    : "Bloquear"}

</button>

            <span>
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </span>

          </div>
        ))}

      </div>

      <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage((prev) =>
        prev - 1
      )
    }
  >
    ←
  </button>

  <span>
    Página {currentPage} de {totalPages}
  </span>

  <button
    disabled={
      currentPage === totalPages
    }
    onClick={() =>
      setCurrentPage((prev) =>
        prev + 1
      )
    }
  >
    →
  </button>

</div>

    </div>
  );
}

export default SuperAdminPanel;