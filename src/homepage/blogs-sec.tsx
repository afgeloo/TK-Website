import React from "react";
import "./css/blogs-sec.css";
import { Link } from "react-router-dom";

interface Blog {
    id: number;
    image: string;
    title: string;
    category: string;
    description: string;
}

const blogData: Blog[] = [
    { id: 1, image: "./src/assets/homepage/blog-1.png", title: "DigiCamp 2024: Phase 2 starts now!" , category: "KARUNUNGAN", description: "Narito ang masayang kaganapan ng Digicamp Phase 2: Mentoring and Feedbacking. Bagamat natapos na ang phase na ito ay hindi rito nagtatapos ang mga panibagong aral at estratehiyang natutuhan ng ating mga delegado. Paniguradong magiging gabay ito upang mas matagumpaynilang maisulong ang kanilang mga adbokasiya!" },
    { id: 2, image: "./src/assets/homepage/blog-2.png", title: "TK Kalusugan: Ginhawa Eskwela" , category: "KALUSUGAN", description: "Ginanap ang unang araw ng Ginhawa Eskwela noong October 28 kasama ang Manila Science High School, MaSci '99, at MSHS LIYAB. Ang Ginhawa Eskwela ay isang peer support training program para sa mga high school students upang matuto tungkol sa mental health, peer support skills, at kung paano ito ginagawa." },
    { id: 3, image: "./src/assets/homepage/blog-2.png", title: "TK Kalusugan: Psychosocial Support" , category: "KALUSUGAN", description: "Sa nagdaang sakuna, mahalagang nabibigyang pansin din natin ang lusog isip dahil maaaring apektado rin ito hindi lamang ang ating pisikal na kalusugan. Ngayong araw, nagkaroon tayo ng sharing circles para mag-kumustahan tungkol sa naging karanasan ng ilang kabataan sa Baseco, noong panahon ng pagsalanta ng Bagyong Carina." }
];

const BlogsSec: React.FC = () => {
    return (
        <div className="blogs-sec">
            <h1 className="blogs-header">BLOGS</h1> 
            <div className="blogs-bg">
                    <img src="./src/assets/homepage/blogs-bg.png" alt="Blogs Background" />
                <div className="blogs-content">
                <div className="blogs-container">
                    {blogData.map((blog) => (
                        <div key={blog.id} className="blog-box">
                            <div className="blogs-image-container">
                                <img src={blog.image} alt={`Blog ${blog.id}`} />
                            </div>
                            <div className="blog-title">
                                <h1>{blog.title}</h1>
                            </div>
                            <div className="blog-category">
                                <p>{blog.category}</p>
                            </div>
                            <div className="blog-description">
                                <p>{blog.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="blogs-sec-nav">
                    <Link to="/Blogs" className="nav-blogs">
                    <img src="./src/assets/homepage/book.png"/>
                    READ MORE</Link>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default BlogsSec;
