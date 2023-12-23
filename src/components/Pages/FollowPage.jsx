export const FollowPage = () => {
  return (
    <>
      <div className="pl-5 flex justify-start border-t border-b border-gray-300">
        <a href="#" className=" p-4 py-2 text-md font-medium text-center">
          About
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ">
          Learning
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ">
          Contact
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2">
        <div className="flex items-center m-3">
          <img
            src="https://fakeimg.pl/60x60"
            alt="Profile Image"
            className="w-30 h-30 rounded-full mr-2"
          />
          <div className="pl-3">
            <h2 className="text-l font-semibold">Eong Koungmeng</h2>
            <div className="flex justify-start">
              <a href="#" className=" py-2 text-sm font-medium text-center">
                Follower: 2
              </a>
            </div>
          </div>
          <a
            href="#"
            className="ml-10 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unfollow
          </a>
        </div>

        <div className="flex items-center m-3">
          <img
            src="https://fakeimg.pl/60x60"
            alt="Profile Image"
            className="w-30 h-30 rounded-full mr-2"
          />
          <div className="pl-3">
            <h2 className="text-l font-semibold">Eong Koungmeng</h2>
            <div className="flex justify-start">
              <a href="#" className=" py-2 text-sm font-medium text-center">
                Follower: 2
              </a>
            </div>
          </div>
          <a
            href="#"
            className="ml-10 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unfollow
          </a>
        </div>

        <div className="flex items-center m-3">
          <img
            src="https://fakeimg.pl/60x60"
            alt="Profile Image"
            className="w-30 h-30 rounded-full mr-2"
          />
          <div className="pl-3">
            <h2 className="text-l font-semibold">Eong Koungmeng</h2>
            <div className="flex justify-start">
              <a href="#" className=" py-2 text-sm font-medium text-center">
                Follower: 2
              </a>
            </div>
          </div>
          <a
            href="#"
            className="ml-10 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Unfollow
          </a>
        </div>
      </div>
    </>
  );
};
