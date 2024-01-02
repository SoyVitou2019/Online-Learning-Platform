import { CardPortrait } from "../../../components/HomePage/CardPortrait";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { VideoList } from "./VideoList";
import END_POINTS from "../../../constants/endpoints";
import BackButton from "../../../components/BackButton";

export const SelectCourse = ({ course_id }) => {
  const [course, setCourse] = useState({});
  const [courseByTeacher, setCourseByTeacher] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [teacher, setTeacher] = useState({});

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
    // Function to fetch teacher details
    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(
          `${END_POINTS.USER}/${course.created_by_user_id}`
        );
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          END_POINTS.COURSE + "?created_by_user_id=" + course.created_by_user_id
        );
        const coursesData = response.data;

        // Fetch creator names for each course
        const coursesWithNames = await Promise.all(
          coursesData.map(async (course) => {
            const creatorName = await fetchCreatorName(
              course.created_by_user_id
            );
            return { ...course, creatorName };
          })
        );

        setCourseByTeacher(coursesWithNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCreatorName = async (userID) => {
      try {
        const userResponse = await axios.get(`${END_POINTS.USER}/${userID}`);
        return userResponse.data.firstName + " " + userResponse.data.lastName; // Assuming the user endpoint returns the user details including the name
      } catch (error) {
        console.error("Error fetching creator name:", error);
        return "Unknown"; // Default to 'Unknown' if there's an error
      }
    };

    // Check if course.creator_id is available and call fetchTeacherDetails
    if (course.created_by_user_id) {
      fetchTeacherDetails();
      fetchCourses();
    }
  }, [course.created_by_user_id]);

  return (
    <section className=" bg-slate-300">
      <div className="flex mt-5 pt-5 pb-10">
        <div className="ml-10 w-2/3">
          <BackButton />
          <h1 className="font-semibold underline text-3xl my-3">
            {course.course_name}
          </h1>
          <div>
            <p>{course.couse_description}</p>
          </div>
          <div className=" mt-9 pt-3 pb-3 bg-slate-200">
            <div className="px-3">
              <p className=" text-xl">What you will learn</p>
              <div className="grid grid-flow-col h-auto gap-8 mt-4 bg-white p-5">
                <div className="flex flex-col justify-around gap-8">
                  {course.course_expectation?.map((expectation, index) => (
                    <p key={index}> {"✅ " + expectation}</p>
                  ))}
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
          <p className=" text-2xl font-bold mb-3">About Teacher</p>
          <img
            className="mx-auto"
            src="https://fakeimg.pl/500x200"
            alt="mockup"
          />
          <div className="mt-2">
            <a href="#" className="flex items-center ps-2.5 mb-5">
              <i
                className="bi bi-person-circle w-20 text-6xl "
                style={{ color: "black" }}
              ></i>
              <div className="flex-col px-3 ">
                <span className="text-xl whitespace-nowrap dark:text-black font-bold">
                  {teacher.firstName + " " + teacher.lastName}
                </span>
                <div className="text-black text-xs">Followers: 15</div>
              </div>
            </a>
          </div>
          <div className="ml-3">
            <p className=" font-bold mt-3">About :</p>
            <ul className="mt-2">{teacher.about}</ul>
          </div>
          <div className=" font-bold mt-5 ml-3">
            Other Courses by {teacher.firstName + " " + teacher.lastName}
          </div>
          <div className=" mx-4 mt-4 pb-10">
            {courseByTeacher.map((c) => (
              <div key={c.id} className="mb-2">
                <CardPortrait
                  showDetail={true}
                  course_name={c.course_name}
                  vid_id={c.vid_id}
                  course_description={c.couse_description}
                  created_by={c.creatorName}
                  creator_id={c.created_by_user_id}
                  created_at={c.created_at}
                  category={c.category}
                  rank={c.rank}
                  posts={c.posts}
                  course_expectation={c.course_expectation}
                  course_id={c.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
