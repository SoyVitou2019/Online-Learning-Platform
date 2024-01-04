import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { VideoList } from "./VideoList";
import END_POINTS from "../../../constants/endpoints";
import { youtubeKey } from "../../auth/api/client";

const PlayCourse = () => {
  const { course_id } = useParams();
  const { index } = useParams();

  const [course, setCourse] = useState({});
  const [postDetails, setPostDetails] = useState([]);
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(END_POINTS.COURSE + "/" + course_id); // Replace with your actual API endpoint
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
          const response = await axios.get(`${END_POINTS.POST}/${post_id}`);
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

  useEffect(() => {
    const fetchDesc = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${postDetails[index]?.vid_id}&key=${youtubeKey}`
        );

        if (response.data.items.length > 0) {
          setVideoDetails(response.data.items[0].snippet);
        } else {
          console.error("No video details found.");
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };
    if (course.posts && course.posts.length > 0) {
      fetchDesc();
    }
  }, [postDetails]);

  return (
    <section>
      <section className="mx-3">
        <h1 className=" py-5 font-semibold text-2xl ml-3 underline">
          {course.course_name}
        </h1>
        <div className="flex h-[85vh]">
          {/* left side */}
          <div className=" bg-slate-200 h-full w-[45%] overflow-y-scroll">
            <div className="mx-2 py-2 flex flex-col gap-2  ">
              <p className=" font-bold text-xl">Course Content</p>
              {/* Item1 */}
              {postDetails.map((post, index) => (
                <VideoList
                  key={post.id}
                  post_id={post.id}
                  course_id={course_id}
                  index={index}
                  title={post.title}
                  vid_id={post.vid_id}
                />
              ))}
            </div>
          </div>

          {/* right side */}
          <div className="w-full">
            {/* frame */}
            <div className="px-10">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${postDetails[index]?.vid_id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className=" mt-4">
                <p className=" font-bold text-xl">
                  {postDetails.length > 0 ? postDetails[index].title : ""}
                </p>
              </div>
              <p className="mt-2">{videoDetails?.description}</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PlayCourse;
