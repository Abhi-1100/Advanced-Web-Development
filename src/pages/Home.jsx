import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import ProjectsList from '../components/ProjectsList';
import Footer from '../components/Footer';

function Home() {
  const skills = ['C', 'C++', 'Java', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'MongoDB', 'Express.js', 'React', 'Node.js', 'MySQL', 'PHP', 'Vercel', 'Canva', 'Bootstrap', 'TailwindCSS', 'Next.js'];
  const highlights = [
    'Passionate about building practical and problem-solving projects',
    'Hands-on experience in software, web development, and IoT',
    'Enjoys creating clean, functional, and user-friendly solutions',
  ];
  const projects = [
    { title: 'Gesture-Controlled & Obstacle-Avoiding Car', description: 'An embedded hardware project combining control systems and real-world interaction.' },
    { title: 'Electronic Voting Machine', description: 'A digital-logic-based system designed with practical functionality in mind.' },
    { title: 'Full-Stack Web Applications', description: 'Projects featuring authentication, dashboards, and modern web interfaces.' },
  ];

  return (
    <div className="home-layout">
      <Header name="Abhi Kakadiya" title="Developer | Problem Solver | Tech Explorer" themeColor="#2563eb" />
      <About bio="I am a passionate and curious developer who enjoys building practical and problem-solving projects. I have hands-on experience in C, C++, Java, Web Development, and the MERN stack. I love turning ideas into real working systems, from software applications to hardware-integrated IoT projects." highlights={highlights} />
      <Skills skillList={skills} />
      <ProjectsList projects={projects} />
      <Footer email="abhikakadiya1043@gmail.com" github="https://github.com/Abhi-1100" />
    </div>
  );
}

export default Home;
