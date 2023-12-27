export const VideoList = () => {
  return (
    <div className="flex items-center bg-green-300">
      <img
        className="w-40 aspect-video"
        src="https://fakeimg.pl/1600x900"
        alt=""
      />
      <div className="flex flex-col flex-grow">
        <h5 className="text-black font-bold ml-4">
          The Complete Python Course 2023
        </h5>
      </div>
      <p className="flex justify-end mr-4">15:22</p>
    </div>
  );
};
