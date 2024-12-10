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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        CRUD App Using JSON
      </h2>

      {/* Create Items Button */}
      <Link
        to="/create"
        className={cn(
          buttonVariants({ variant: "default" }),
          "px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        )}
      >
        Create Items
      </Link>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/edit/${user.id}`}
                      className={cn(
                        buttonVariants({ variant: "secondary" }),
                        "px-4 py-2 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500"
                      )}
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="destructive"
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
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
    </div>
  );
}

export default Home;
