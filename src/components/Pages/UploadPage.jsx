export const UploadPage = () => {
  return (
    <>
      <div className="px-5 flex justify-start border-t border-b border-gray-300">
        <a href="#" className=" p-4 py-2 text-md font-medium text-center">
          Course
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ">
          Analytics
        </a>
        <a href="#" className=" p-4  py-2 text-md font-medium ml-auto ">
          Publish
        </a>
      </div>
      <p className="font-bold pl-9 pt-4 ">Upload Videos</p>
      <div className="flex flex-col items-center mt-10">
        <div className="flex bg-gray-300 w-80 items-center m-3">
          <p className="px-5 py-3">Select Category</p>
          <span className="ml-auto pr-5 ">&rarr;</span>
        </div>
        <div className="flex bg-gray-300 w-80 items-center m-3">
          <input
            className="px-5 py-3 bg-gray-300"
            type="text"
            id="courseName"
            placeholder="Course name"
          />
        </div>
        <div className="flex bg-gray-300 w-80 items-center m-3">
          <input
            className="px-5 py-3 bg-gray-300"
            type="desc"
            id="courseName"
            placeholder="Course description"
          />
        </div>
        <div className="flex   items-center m-3">
          <img src="https://fakeimg.pl/50x50" alt="" className="mr-3" />
          <input
            className="px-5 py-3 bg-gray-300 w-80"
            type="desc"
            id="courseName"
            placeholder="Link from YouTube"
          />
          <img src="https://fakeimg.pl/25x25" alt="" className="ml-3" />
          <img src="https://fakeimg.pl/25x25" alt="" />
        </div>

        <div className="flex   items-center m-3">
          <img src="https://fakeimg.pl/50x50" alt="" className="mr-3" />
          <input
            className="px-5 py-3 bg-gray-300 w-80"
            type="desc"
            id="courseName"
            placeholder="Link from YouTube"
          />
          <img src="https://fakeimg.pl/25x25" alt="" className="ml-3" />
          <img src="https://fakeimg.pl/25x25" alt="" />
        </div>

        <div className="flex   items-center m-3">
          <img src="https://fakeimg.pl/50x50" alt="" className="mr-3" />
          <input
            className="px-5 py-3 bg-gray-300 w-80"
            type="desc"
            id="courseName"
            placeholder="Link from YouTube"
          />
          <img src="https://fakeimg.pl/25x25" alt="" className="ml-3" />
          <img src="https://fakeimg.pl/25x25" alt="" />
        </div>
      </div>
    </>
  );
};
