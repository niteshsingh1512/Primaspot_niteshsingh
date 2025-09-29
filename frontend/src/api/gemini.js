export const callGeminiAPI = async (prompt) => {
    console.log("Calling Gemini API with prompt:", prompt);
    // This is a simulation. In a real app, you would make a fetch call here.
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (prompt.includes("content strategy")) {
        return `### Content Strategy Suggestions\n**1. Double Down on Sustainable Fashion:** Your audience loves your eco-conscious content. Create a "Thrift Flip" Reel series or partner with a sustainable brand.\n**2. 'A Day in the Life' Content:** Your followers engage well with 'behind-the-scenes' content. A weekly vlog-style post could perform well.\n**3. Interactive Q&A Sessions:** Host a weekly "Ask Alexia" on Instagram Stories to boost engagement.\n\n### Post Ideas\n- **Post:** "3 Ways to Style a White T-Shirt for Fall"\n- **Reel:** "Paris Fashion Week Inspired Looks on a Budget"\n- **Story:** Poll your audience on which city's street style to feature next.\n\n### Hashtag Recommendations\n- #SustainableStyle #EthicalFashion #ConsciousConsumer #VintageFinds #SecondhandStyle`;
    }
    if (prompt.includes("caption for a post")) {
        const vibe = prompt.match(/vibe: (.*?),/)[1];
        return `1. "Embracing the ${vibe} side of life. ✨ Which look is your favorite?"\n2. "Channeling my inner ${vibe}. This outfit just feels right. #fashioninspo"\n3. "Serving up some serious ${vibe} energy today! Let me know what you think in the comments. 👇"`;
    }
    if (prompt.includes("audience persona")) {
        return `### Audience Persona: "The Conscious Creative"\n**Name:** Sophia\n**Age:** 26\n**Location:** Brooklyn, New York\n**Occupation:** Graphic Designer\n**Bio:** A creatively-driven individual who is passionate about ethical consumption and finding beauty in the everyday. She values authenticity and storytelling over fleeting trends.\n\n**Motivations:**\n- Wants to build a stylish, sustainable wardrobe without breaking the bank.\n- Looks for inspiration that feels both aspirational and achievable.\n- Enjoys connecting with creators who share her values.\n\n**Pain Points:**\n- Feels overwhelmed by fast fashion.\n- Struggles to find high-quality, ethically-made pieces.\n- Wants her social media feed to be a source of positivity and inspiration.`;
    }
    return "No mock response found for this prompt.";
};

export const handleGenerate = async (type, setGeneratedContent) => {
    setGeneratedContent(prev => ({ ...prev, [type]: null }));
    let prompt = '';
    if (type === 'strategy') {
        prompt = `Analyze the following influencer data and provide a content strategy...`;
    } else if (type === 'persona') {
        prompt = `Based on the following audience data, create a detailed audience persona...`;
    }

    const response = await callGeminiAPI(prompt);
    setGeneratedContent(prev => ({ ...prev, [type]: response }));
};
