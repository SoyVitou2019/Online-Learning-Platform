import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { VideoList } from "./VideoList";

const PlayCourse = () => {
  const { course_id } = useParams();
  const { index } = useParams();

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
    <section>
      <section className="mx-3">
        <h1 className=" py-10 font-bold text-2xl ml-3">
          The Python Tutorial for Beginner
        </h1>
        <div className="flex">
          {/* left side */}
          <div className=" bg-slate-200">
            <div className="mx-2 py-2 flex flex-col gap-2">
              <p className=" font-bold text-xl">Course Content</p>
              {/* Item1 */}
              {postDetails.map((post, index) => (
                <VideoList
                  key={post.id}
                  post_id={post.id}
                  course_id={course_id}
                  index={index}
                  title={post.title}
                />
              ))}
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
                <p className="mr-4 mt-auto mb-2">15:22</p>
              </div>
            </div>
          </div>

          {/* right side */}
          <div>
            {/* frame */}
            <div className="px-10">
              <img
                className="aspect-video"
                src="https://fakeimg.pl/1080x720"
                alt=""
              />
              <div className=" mt-4">
                <p className=" font-bold text-xl">
                  {postDetails.length > 0 ? postDetails[index].title : ""}
                </p>
                <p className="mt-2">
                  Master Python by building 100 projects in 100 days. learn data
                  science, automation, build websites, games and apps!
                </p>
                <p className="mt-3">
                  Awesome video! One small thing is that the music was a little
                  bit too loud compared to the volume of your voice at parts.
                  Good luck with your project !! ... more
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PlayCourse;
