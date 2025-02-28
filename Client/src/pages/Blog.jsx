import { Link } from "react-router";

const blogs = [
  {
    id: 1,
    title: "How to Heal Disorganized Attachment in a Relationship",
    coverImage: "/images/disorganized.webp",
    description: "Understanding and healing attachment wounds in relationships.",
  },
  {
    id: 2,
    title: "4 Signs You Don’t Feel Emotionally Safe in a Relationship",
    coverImage: "images/emotional.webp",
    description: "Recognizing emotional safety issues in your relationship.",
  },
  {
    id: 3,
    title: "100 Uncomfortable Questions to Ask Your Partner",
    coverImage: "/images/uncomfort.webp",
    description: "Deep questions to strengthen communication and trust.",
  },
  {
    id: 4,
    title: "The Importance of Father-Son Relationships: 9 Powerful Facts",
    coverImage: "/images/father.webp",
    description: "Why the father-son bond is crucial for emotional health.",
  },
  {
    id: 5,
    title: "What Are the 7 Symptoms of a Sociopath? Signs, Traits, Risks",
    coverImage: "https://source.unsplash.com/600x400/?psychology,mind",
    description: "Understanding sociopathic traits and their impact.",
  },
  {
    id: 6,
    title: "Trauma Bonding With a Narcissist in Relationship",
    coverImage: "https://source.unsplash.com/600x400/?narcissist,abuse",
    description: "How trauma bonds keep people stuck in toxic relationships.",
  },
  {
    id: 7,
    title: "Why Do I Ghost People? 15 Honest Reasons You Disappear",
    coverImage: "https://source.unsplash.com/600x400/?ghosting,mentalhealth",
    description: "Understanding the psychology behind ghosting behavior.",
  },
  {
    id: 8,
    title: "7 Stages of Trauma Bonding: Spot the Cycle and Break Free",
    coverImage: "https://source.unsplash.com/600x400/?trauma,cycle",
    description: "Recognizing and breaking free from trauma bonding.",
  },
  {
    id: 9,
    title: "Dangers of Singing Bowls: 8 Side Effects of Sound Healing",
    coverImage: "https://source.unsplash.com/600x400/?sound,healing",
    description: "Exploring potential risks of sound healing therapy.",
  },
  {
    id: 10,
    title: "How to Overcome Hope Deferred: 7 Sly Moves to Stay Strong",
    coverImage: "https://source.unsplash.com/600x400/?hope,strength",
    description: "Handling emotional struggles when hope feels distant.",
  },
];

export default function BlogList() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mental Health Blogs</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="block bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
          >
            <img src={blog.coverImage} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 mt-2">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
