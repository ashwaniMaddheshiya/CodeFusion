"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import myFetch from "@/components/utils/myFetch";
import { baseUrl } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";

interface DTO {
  name?: string;
  roomId?: string;
  userId: any;
}

export default function Home() {
  const [activeButton, setActiveButton] = useState<"create" | "join">("create");
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const dto: DTO = { userId: user._id };

    if (activeButton === "create") {
      dto.name = inputText;
    } else if (activeButton === "join") {
      dto.roomId = inputText;
    }

    console.log(dto);
    const url =
      activeButton === "create"
        ? `${baseUrl}/api/room/create`
        : `${baseUrl}/api/room/join`;

    const { data, error }: any = await myFetch(url, {
      method: "POST",
      body: JSON.stringify(dto),
    });

    console.log(data);

    if (data) {
      // Assuming you will redirect to the editor page on success
      router.push(`/editor/${data._id}`);
    }

    if (error) {
      console.log(error);
      setError(error?.message);
    }

    setLoading(false); // Stop the loading state regardless of success or error
  };

  return (
    <div className="grid md:grid-cols-4 items-center rounded-xl overflow-hidden">
      <div className="md:col-span-2 w-full py-6 px-6 sm:px-16 mt-20">
        {/* Button Container */}
        <div className="flex space-x-6 w-full text-2xl">
          <button
            onClick={() => setActiveButton("create")}
            className={`px-6 py-3 transition duration-300 ease-in-out transform flex-1 ${
              activeButton === "create"
                ? "text-blue-600 font-semibold scale-125"
                : "text-gray-500"
            }`}
          >
            Create Room
          </button>
          <button
            onClick={() => setActiveButton("join")}
            className={`px-6 py-3 transition duration-300 ease-in-out transform flex-1 ${
              activeButton === "join"
                ? "text-green-600 font-semibold scale-125"
                : "text-gray-500"
            }`}
          >
            Join Room
          </button>
        </div>
        {/* Input Field */}
        <div className="space-y-6">
          <div>
            <div className="relative flex items-center mt-2">
              <input
                name="roomInfo"
                type="text"
                onChange={(event) => setInputText(event.target.value)}
                placeholder={
                  activeButton === "create"
                    ? "Enter room name to create"
                    : "Enter room ID to join"
                }
                className={`text-gray-900 bg-white border ${"border-gray-300"} w-full text-sm px-4 py-2.5 rounded-md outline-none focus:border-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Join/Create Button */}
        <div className="!mt-12">
          <button
            type="submit"
            className={`w-full py-3 px-4 tracking-wider text-sm rounded-md text-white focus:outline-none cursor-pointer transition duration-300 ease-in-out transform ${
              activeButton === "create"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-green-600 text-white hover:bg-green-700"
            } `}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : activeButton === "create"
              ? "Create Room"
              : "Join Room"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
