import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

function SuperAdminPanel() {

  const [users, setUsers] = useState([]);

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

  return (

    <div className="super-admin-panel">

      <h1>
        Super Admin Panel
      </h1>

      <div className="users-table">

        <div className="users-header">
          <span>Nombre</span>
          <span>Email</span>
          <span>Rol</span>
          <span>Creado</span>
        </div>

        {users.map((user) => (

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

            <span>
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SuperAdminPanel;