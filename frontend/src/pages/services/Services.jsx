import Layout from '../../components/layouts/Layout';

const Services = () => {
    return (
        <Layout>
            <div className="container py-5">
                <div className="text-center mb-5">
                    <img
                        className="mx-auto mb-8"
                        src="https://cdn-icons-png.flaticon.com/512/7978/7978776.png"
                        alt="new image"
                        height={300}   // Reduced the height
                        width={300}    // Added width for consistency
                    />

                    <h2 className="text-success mb-8 " style={{ "fontWeight": "bold", "fontSize": "30px" }}>Our Services</h2>
                    <h2 className="mb-2">We Provide A Lot of Cool Services</h2>
                    <p className="w-75 mx-auto mb-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dolore, illo quas officia adipisci pariatur doloribus fugit consectetur voluptates aperiam eaque qui omnis est facere a itaque nesciunt! Pariatur asperiores perspiciatis atque quisquam est, quam aspernatur ad saepe tenetur quasi temporibus culpa laborum nostrum.
                    </p>
                </div>

                <div className="row g-4">
                    {[
                        {
                            img: "https://media.istockphoto.com/id/1496029848/vector/project-management-tools-blue-gradient-concept-icon.jpg?s=612x612&w=0&k=20&c=BtIwUwulz-YGouHhAcZB5u_fQCpudgewk8dUUE8Er4E=",
                            title: "1. Advanced Project Management Tools",
                            desc: "Collaboration Tools: Add features like real-time document editing and task management tools to aid student groups in organizing, tracking, and managing project milestones."
                        },
                        {
                            img: "https://wowdesk.com/wp-content/uploads/2024/12/67f6c35b030eb91383a81c618c61336f-copy.jpg",
                            title: "2. Feedback Systems",
                            desc: "Automated Feedback Tools: Provide basic automated feedback for coding projects (like error checking, basic functionality assessment) or writing (grammar, structure checks) to help students improve their submissions before mentor evaluation."
                        },
                        {
                            img: "https://media.licdn.com/dms/image/v2/D4D12AQGuqvVELlIj5w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1677724048133?e=2147483647&v=beta&t=iiz5o7fMuXZcfwBer47FEicoThgsy5MU6HA1I7_z6hU",
                            title: "3. Industry Linkages & Career Opportunities",
                            desc: "Industry Partnership Programs: Engage industry experts by inviting them to sponsor projects, offer feedback, or even fund innovative solutions developed on the platform."
                        },
                        {
                            img: "https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg",
                            title: "4. Learning and Skill Development",
                            desc: "Hackathons and Competitions: Organize competitions or hackathons where students can work on real-world problems and have their work judged by professionals."
                        },
                        {
                            img: "https://thumbs.dreamstime.com/b/personalized-product-recommendation-isometric-scene-most-relevant-to-user-based-his-behavior-profile-vector-243058852.jpg",
                            title: "5. Customization and Personalization",
                            desc: "Personalized Recommendations: Use AI to recommend projects, mentors, or courses based on a student's interests, skills, and previous work."
                        },
                        {
                            img: "https://static.vecteezy.com/system/resources/previews/055/770/297/non_2x/real-estate-networking-icon-for-community-building-vector.jpg",
                            title: "6. Networking and Community Building",
                            desc: "Event Calendar: A centralized calendar to inform students about upcoming events, deadlines, webinars, or project showcases."
                        }
                    ].map((service, index) => (
                        <div
                            key={index}
                            className="col-lg-4 col-md-6 d-flex align-items-stretch"
                            style={{ cursor: 'pointer' }}  // Added cursor pointer here
                        >
                            <div className="card text-center p-4 shadow-sm w-100">
                                <img
                                    src={service.img}
                                    alt={service.title}
                                    className="card-img-top img-fluid"
                                    style={{
                                        height: '250px',
                                        width: '100%',
                                        maxWidth: '300px',
                                        objectFit: 'cover',
                                        margin: '0 auto'
                                    }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{service.title}</h5>
                                    <p className="card-text">{service.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Services;
