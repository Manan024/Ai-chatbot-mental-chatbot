import { useParams } from "react-router";
import { Link } from "react-router";

const blogs = [
    {
        id: 1,
        title: "How to Heal Disorganized Attachment in a Relationship",
        coverImage: "/images/disorganized.webp",
        description: "Understanding and healing attachment wounds in relationships.",
        content: `
      Disorganized attachment can make relationships challenging, causing feelings of fear, confusion, and insecurity.
      Healing from it requires self-awareness, therapy, and a supportive partner. 
      Some strategies to heal include:
      
      1️⃣ **Recognizing the patterns** – Acknowledge the moments of fear and emotional shutdown.  
      2️⃣ **Building self-trust** – Engage in self-soothing techniques like journaling and mindfulness.  
      3️⃣ **Seeking therapy** – Working with a trauma-informed therapist can help heal deep wounds.  
      4️⃣ **Practicing secure attachment behaviors** – Open communication, consistency, and reassurance.  

      Healing is a journey, but with patience and support, you can build healthier relationships.
    `,
    },
    {
        id: 2,
        title: "4 Signs You Don’t Feel Emotionally Safe in a Relationship",
        coverImage: "/images/emotional.webp",
        description: "Recognizing emotional safety issues in your relationship.",
        content: `
      Emotional safety is the foundation of any healthy relationship.
      Here are 4 signs you might not feel emotionally safe:

      🚩 **Fear of expressing yourself** – You hesitate to share your feelings out of fear of being judged.  
      🚩 **Walking on eggshells** – You constantly monitor your words to avoid conflict.  
      🚩 **Feeling dismissed** – Your partner downplays your emotions or invalidates your feelings.  
      🚩 **Lack of trust** – You struggle to believe your partner has your best interests in mind.  

      If you notice these signs, consider open communication, setting boundaries, or seeking professional help.
    `,
    },
    {
        id: 3,
        title: "100 Uncomfortable Questions to Ask Your Partner",
        coverImage: "/images/uncomfort.webp",
        description: "Recognizing emotional safety issues in your relationship.",
        content: `
     Deep, meaningful conversations strengthen relationships. Asking uncomfortable yet important questions can bring emotional clarity, foster intimacy, and reveal hidden concerns.

💬 Relationship & Commitment Questions:

Have you ever doubted our relationship?
What’s one thing you wish you could change about me?
Do you think we communicate effectively?
Have you ever felt emotionally neglected in our relationship?
Do you feel I meet your emotional and physical needs?
💬 Personal & Childhood Questions:
6. What’s the most painful memory from your past?
7. How did your parents express love growing up?
8. Do you believe past traumas still affect you today?
9. What’s one childhood experience that shaped who you are?
10. Have you ever been emotionally hurt by someone you loved?

💬 Trust & Honesty Questions:
11. Have you ever lied to me about something important?
12. Do you feel comfortable being 100% honest with me?
13. What’s your biggest insecurity in our relationship?
14. Have you ever felt jealous of someone in my life?
15. Do you trust me completely?

💬 Intimacy & Physical Connection Questions:
16. What’s something you’ve always wanted to try in our relationship?
17. Do you feel emotionally connected when we are intimate?
18. Have you ever faked your emotions to please me?
19. What’s your biggest turn-off in a relationship?
20. How do you define intimacy beyond physical connection?

💬 Breakup & Future Concerns Questions:
21. What’s one thing that could make you leave this relationship?
22. Do you see us growing old together?
23. If we had major problems, would you rather work on them or walk away?
24. What’s one regret you have about our relationship?
25. Do you think love alone is enough to sustain a relationship?

These deep, sometimes uncomfortable questions can help you and your partner build a stronger, more transparent relationship.
    `,
    },
    {
        id: 4,
        title: "Father - son relationship",
        coverImage: "/images/father.webp",
        description: "Recognizing emotional safety issues in your relationship.",
        content: `The relationship between a father and son shapes emotional well-being, confidence, and life decisions. A strong bond fosters emotional security, while a distant or absent father can lead to self-esteem struggles.

📌 9 Powerful Facts About Father-Son Relationships:

🔹 1. Fathers Are Role Models

Sons subconsciously imitate their father’s behavior, whether positive or negative.
A father’s presence influences how a son approaches relationships, career, and self-worth.
🔹 2. Fathers Teach Emotional Resilience

Boys learn emotional regulation from watching how their fathers handle stress.
Open emotional expression prevents unhealthy coping mechanisms.
🔹 3. Absentee Fathers Increase Emotional Struggles

Studies show boys raised without fathers are more likely to struggle with anxiety and depression.
Sons may seek father figures elsewhere, sometimes in negative influences.
🔹 4. Strong Bonds Reduce Risky Behaviors

Boys with involved fathers are less likely to engage in substance abuse or criminal activities.
A father’s guidance provides a moral compass.
🔹 5. Healthy Relationships Improve Future Parenting Skills

Sons with affectionate fathers are more likely to be loving parents.
The father-son relationship sets the foundation for how they will treat their own children.
🔹 6. Fathers Boost Academic & Career Success

Research shows engaged fathers positively influence their son’s educational performance.
A father’s encouragement builds ambition and resilience.
🔹 7. Fathers Shape Confidence & Self-Worth

Sons who feel valued by their fathers develop higher self-esteem.
Supportive fathers instill a sense of inner strength and emotional security.
🔹 8. Father-Son Bonding Improves Mental Health

Regular quality time, such as hobbies, deep conversations, or sports, strengthens emotional connection.
Sons with active father figures are less likely to suffer from loneliness and depression.
🔹 9. It’s Never Too Late to Repair the Relationship

Even if the father-son bond has been strained, open conversations and effort can heal past wounds.
Seeking therapy together or writing heartfelt letters can rebuild trust.
A father’s role in his son’s life is irreplaceable—through presence, guidance, and emotional connection, a father shapes his son’s identity and emotional well-being.`

    }

];

export default function BlogDetail() {
    const { id } = useParams();
    const blog = blogs.find((b) => b.id === parseInt(id));

    if (!blog) {
        return <h1 className="text-center text-red-500 text-xl">Blog Not Found</h1>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Link to="/blogs" className="text-blue-500 mb-4 inline-block">⬅ Back to Blogs</Link>
            <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
            <img src={blog.coverImage} alt={blog.title} className="w-full h-64 object-cover mt-4 rounded-lg shadow-md" />
            <p className="text-gray-700 mt-6 whitespace-pre-line">{blog.content}</p>
        </div>
    );
}
