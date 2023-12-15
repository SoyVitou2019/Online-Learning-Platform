export const ProfilePage = () => {
  return (
    <>
      <div className="relative">
        <img
          src="https://fakeimg.pl/1600x900"
          alt="Banner Image"
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="flex items-center justify-between pl-8 text-black -translate-y-6">
        <div className="flex items-center">
          <img
            src="https://fakeimg.pl/100x100"
            alt="Profile Image"
            className="w-30 h-30 rounded-full mr-2"
          />
          <div className="pl-5">
            <h3 className="text-xl">Student</h3>
            <h2 className="text-xl font-semibold">Eong Koungmeng</h2>
            <div className="flex justify-start">
              <a href="#" className=" py-2 text-sm font-medium text-center">
                Follower: 2
              </a>
              <a href="#" className="ml-auto py-2 text-sm font-medium ">
                Following: 4
              </a>
            </div>
          </div>
        </div>
      </div>
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

      <div className="bg-gray-400 pl-9">
        <p>Joined 19th July 2023</p>
        <p>I am Koungmeng. I love Anime and Video games. Thanks</p>
        <p>Education: </p>
        <ul>
          <li>Hello</li>
          <li>My name</li>
        </ul>
      </div>
    </>
  );
};
