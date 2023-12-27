import { CardPortrait } from "../../../components/HomePage/CardPortrait";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { VideoList } from "./VideoList";

export const SelectCourse = ({ course_id }) => {
  const graduated = [
    "Graduated from High school",
    "Master of art",
    "Master of Big Data",
  ];

  const [course, setCourse] = useState({});
  const [postDetails, setPostDetails] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://coding-fairy.com/api/mock-api-resources/ols/course/" +
            course_id
        ); // Replace with your actual API endpoint
        setCourse(response.data); // Assuming the API response is an array of courses
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchCourses();
  }, [course_id]); // Empty dependency array ensures that the effect runs only once (on mount)

  useEffect(() => {
    // Function to fetch post details for each post_id in the course
    const fetchPostDetails = async () => {
      try {
        // Assuming course.posts is the array of post_ids in your course object
        const promises = course.posts.map(async (post_id) => {
          const response = await axios.get(
            `https://coding-fairy.com/api/mock-api-resources/ols/post/${post_id}`
          );
          return response.data;
        });

        // Wait for all promises to resolve
        const postDetailsData = await Promise.all(promises);

        // Set the post details in state
        setPostDetails(postDetailsData);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    // Check if course.posts is available and call fetchPostDetails
    if (course.posts && course.posts.length > 0) {
      fetchPostDetails();
    }
  }, [course.posts]);

  return (
    <section className=" bg-slate-300">
      <div className="flex mt-5 pt-5 pb-10">
        <div className="ml-10">
          <h1 className=" text-3xl">{course.course_name}</h1>
          <div>
            <p>
              Master Python by building 100 projects in 100 days. Learn
              <br />
              data science, automation, build websites, games and apps!
            </p>
          </div>
          <div className=" mt-9 pt-3 pb-3 bg-slate-200">
            <div className="px-3">
              <p className=" text-xl">What you will learn</p>
              <div className="grid grid-flow-col h-auto gap-8 mt-4 bg-white p-5">
                <div className="flex flex-col justify-around gap-8">
                  <p>
                    {" "}
                    ✅ you will master the Python programming language by
                    building 100 unique projects over 100 days.
                  </p>
                  <p>
                    {" "}
                    ✅ You will be able to program in Python professionally
                  </p>
                  <p>
                    {" "}
                    ✅ Create a portfolio of 100 Python project to apply for
                    developer jobs
                  </p>
                  <p>
                    {" "}
                    ✅ Be able to use Python for data science and machine
                    learning
                  </p>
                  <p> ✅ Build GUIs and Desktop applications with Python</p>
                </div>
                <div className="flex flex-col justify-around gap-8">
                  <p>
                    {" "}
                    ✅ you will master the Python programming language by
                    building 100 unique projects over 100 days.
                  </p>
                  <p>
                    {" "}
                    ✅ You will be able to program in Python professionally
                  </p>
                  <p>
                    {" "}
                    ✅ Create a portfolio of 100 Python project to apply for
                    developer jobs
                  </p>
                  <p>
                    {" "}
                    ✅ Be able to use Python for data science and machine
                    learning
                  </p>
                  <p> ✅ Build GUIs and Desktop applications with Python</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 pt-3 pb-3 bg-slate-200">
            <div className="px-3">
              <p className="text-xl">Course Content</p>
              <div className="grid grid-flow-row h-auto gap-4 mt-4">
                {/* Landscape content */}

                {/* Item1 */}
                {postDetails.map((post) => (
                  <VideoList key={post.id} title={post.title} />
                ))}
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

                {/* Item2 */}
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

                {/* Item3 */}
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
              </div>
            </div>
          </div>
        </div>
        <div className="mx-10 px-3 py-2 bg-white w-1/3">
          <p className=" text-2xl font-bold">About Teacher</p>
          <img
            className="mx-auto"
            src="https://fakeimg.pl/500x200"
            alt="mockup"
          />
          <div className="mt-6">
            <a href="#" className="flex items-center ps-2.5 mb-5">
              <i
                className="bi bi-person-circle w-20 text-6xl "
                style={{ color: "black" }}
              ></i>
              <div className="flex-col px-3 ">
                <span className="text-xl whitespace-nowrap dark:text-black font-bold">
                  Eong Koungmeng
                </span>
                <div className="text-black text-xs">Followers: 15</div>
              </div>
            </a>
          </div>
          <div className="ml-3">
            <p className="mt-2 font-thin">Joined: 19th July 2020</p>
            <p className=" font-light">
              I am Koungmeng. I love anime and video games. Thank
            </p>
            <p className=" font-bold mt-3">Education :</p>
            <ul className="mt-2">
              {graduated.map((item, idx) => {
                return (
                  <li className="px-10" key={idx}>
                    - {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className=" font-bold mt-5">Other Courses by Koungmeng</div>
          <div className=" mx-4 mt-4 pb-10">
            <CardPortrait />
          </div>
        </div>
      </div>
    </section>
  );
};
