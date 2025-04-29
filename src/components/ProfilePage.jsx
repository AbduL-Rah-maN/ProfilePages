import { GitHub, LinkedIn } from "@mui/icons-material";
import { profileData } from "../data/profileData.js";

export default function ProfilePage() {
  
  const iconMap = {
    github: <GitHub fontSize="medium" />,
    linkedin: <LinkedIn fontSize="medium" />
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 transition-colors duration-500 profile">
      <div className="w-full max-w-3xl bg-opacity-20 p-6 rounded-2xl shadow-lg backdrop-blur-md bg-gray-400">
        <div className="flex flex-col items-center text-center justify-center">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
          />
          <h1 className="text-3xl font-bold">{profileData.name}</h1>
          <p className="text-lg mt-2">{profileData.headline}</p>
          <p className="text-sm text-gray-400 mt-1">{profileData.location}</p>

          <p className="mt-6 max-w-xl">{profileData.about}</p>

          <a
            href={profileData.resumeLink}
            download
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-black transition"
          >
            Download Resume
          </a>

          <div className="flex space-x-6 mt-6">
            {Object.entries(profileData.socials).map(([platform, link]) => (
              <a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
              >
                {iconMap[platform]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-6">
            {profileData.experience.map((exp, index) => (
              <div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-bold">{exp.title} @ {exp.company}</h3>
                <p className="text-sm text-gray-400">{exp.period}</p>
                <p className="mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <p className="font-bold">{profileData.education.degree}</p>
          <p className="text-sm">{profileData.education.university} ({profileData.education.year})</p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm shadow"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}