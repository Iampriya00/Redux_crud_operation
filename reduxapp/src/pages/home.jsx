import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { deleteUser } from "../store/auth/userSlice";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Home() {
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container">
      <h2>CRUD App Using JSON</h2>
      <Link to="/create" className={cn(buttonVariants({ variant: "default" }))}>
        Create Items
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <div className="flex items-center gap-4">
                  <Link
                    to={`/edit/${user.id}`}
                    className={cn(buttonVariants({ variant: "secondary" }))}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
