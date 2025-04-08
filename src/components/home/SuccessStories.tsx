
interface SuccessStory {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export const SuccessStories = () => {
  const stories: SuccessStory[] = [
    {
      name: "Emily Chen",
      role: "Web Development Intern",
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2",
      quote: "InternAI helped me land my dream internship at a top tech company!"
    },
    {
      name: "Alex Rodriguez",
      role: "Digital Marketing Intern",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a",
      quote: "The AI mock interviews were a game-changer for my confidence."
    },
    {
      name: "Sophia Patel",
      role: "UX Design Intern",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
      quote: "Personalized course recommendations helped me level up my skills."
    }
  ];
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Student Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real students, real experiences, real growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.name} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img 
                src={story.image} 
                alt={story.name} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-bold text-lg mb-2">{story.name}</h3>
              <p className="text-muted-foreground mb-3">{story.role}</p>
              <p className="italic text-gray-600">"{story.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
