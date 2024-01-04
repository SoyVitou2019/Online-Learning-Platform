import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { youtubeKey } from "../../auth/api/client";

export const VideoList = ({ post_id, course_id, title, index, vid_id }) => {
  const [duration, setDuration] = useState(null);

  const convertToHHMMSS = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = (match[1] && parseInt(match[1])) || 0;
    const minutes = (match[2] && parseInt(match[2])) || 0;
    const seconds = (match[3] && parseInt(match[3])) || 0;

    return `${hours > 0 ? hours + ":" : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchVideoDuration = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual YouTube Data API key
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${vid_id}&key=${youtubeKey}`;

        console.log(apiUrl);
        const response = await axios.get(apiUrl);

        // Extract duration from the API response
        const videoDuration = convertToHHMMSS(
          response.data.items[0].contentDetails.duration
        );

        setDuration(videoDuration);
      } catch (error) {
        console.error("Error fetching video duration:", error);
      }
    };

    fetchVideoDuration();
  }, [vid_id]);
  return (
    <Link
      to={"/course/" + course_id + "/index/" + index}
      className="flex items-center bg-green-300"
    >
      <img
        className="w-40 aspect-video"
        src={`https://img.youtube.com/vi/${vid_id}/mqdefault.jpg`}
        alt=""
      />
      <div className="flex flex-col flex-grow">
        <h5 className="text-black font-bold ml-4">{title}</h5>
      </div>
      <p className="flex justify-end mr-4">{duration}</p>
    </Link>
  );
};
