"use client";
import { useEffect, useState } from "react";
import CodeMirrorEditor from "@/components/Editor";
import User from "@/components/users/User";
import { baseUrl } from "@/constants";
import myFetch from "@/components/utils/myFetch";

const Home = ({ params }: { params: { roomId: string } }) => {
  const [users, setUsers] = useState<string[]>([]); // Assuming user IDs are strings

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error }: any = await myFetch(
        `${baseUrl}/api/rooms/users/${params.roomId}`
      );

      if (data) {
        console.log(data);
        // setUsers(data)
      }

      if (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [params.roomId]);

  return (
    <div style={{ height: "calc(100vh - 100px)" }} className="flex mt-4">
      <div className="w-[25vw]">
        <div className="text-2xl text-center">Collaborators</div>
        <div className="mt-3 flex flex-wrap gap-[10px] justify-center mx-auto">
          {users.map((user) => (
            <User key={user} />
          ))}
        </div>
        <div className="flex justify-center items-center mb-4">
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md transition-all duration-300 fixed bottom-4">
            Leave
          </button>
        </div>
      </div>
      <div className="w-[75vw]">
        <CodeMirrorEditor />
      </div>
    </div>
  );
};

export default Home;
