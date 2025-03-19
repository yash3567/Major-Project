import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

const ProfilePage = () => {
    const [profileImg, setProfileImg] = useState(null);
    const profileImgRef = useRef(null);
    const { username } = useParams();

    const { follow, isPending } = useFollow();
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    
    const { data: user, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const res = await fetch(`/api/users/profile/${username}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");
            return data;
        },
    });

    const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();
    const isMyProfile = authUser?._id === user?._id;
    const amIFollowing = authUser?.following.includes(user?._id);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImg(reader.result);
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        refetch();
    }, [username, refetch]);

    return (
        <div 
    className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4"
    style={{ height: "100vh", overflow: "hidden" }} // Prevent scrolling
>
    <div 
        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: "500px", 
            height: "400px", 
            overflow: "hidden" // Ensures no internal scrolling
        }}
    >
        {/* Back Button */}
        <Link to="/" className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <FaArrowLeft className="text-xl" />
        </Link>

        {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
        
        {!isLoading && !isRefetching && !user && (
            <p className="text-center text-lg mt-4">User not found</p>
        )}

        {!isLoading && !isRefetching && user && (
            <div className="text-center">
                {/* User Avatar */}
                <div className="relative inline-block">
                    <img 
                        src={profileImg || user?.profileImg || "/avatar-placeholder.png"} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-700"
                    />
                    {isMyProfile && (
                        <button className="absolute bottom-2 right-2 bg-primary p-2 rounded-full text-white shadow-md" onClick={() => profileImgRef.current.click()}>
                            <MdEdit className="w-5 h-5" />
                        </button>
                    )}
                    <input type="file" hidden accept="image/*" ref={profileImgRef} onChange={handleImgChange} />
                </div>
                
                {/* User Info */}
                <div className="mt-4">
                    <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                    <p className="text-gray-500">@{user?.username}</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{user?.bio}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-5">
                    {isMyProfile && <EditProfileModal authUser={authUser} />}
                    {!isMyProfile && (
                        <button className="px-4 py-2 rounded-full border border-gray-500 dark:border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => follow(user?._id)}>
                            {isPending ? "Loading..." : amIFollowing ? "Unfollow" : "Follow"}
                        </button>
                    )}
                    {profileImg && (
                        <button 
                            className="px-4 py-2 rounded-full bg-primary text-white" 
                            onClick={async () => {
                                await updateProfile({ profileImg });
                                setProfileImg(null);
                            }}
                        >
                            {isUpdatingProfile ? "Updating..." : "Update"}
                        </button>
                    )}
                </div>
            </div>
        )}
    </div>
</div>

    
    );
};

export default ProfilePage;
