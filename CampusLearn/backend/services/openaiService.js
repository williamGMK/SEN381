const axios = require('axios');

class OpenAIService {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        this.baseURL = 'https://api.openai.com/v1';
    }

    async generateAnswer(question, context = '') {
        try {
            if (!this.apiKey) {
                throw new Error('OpenAI API key not configured');
            }

            const prompt = this.buildPrompt(question, context);

            const response = await axios.post(
                `${this.baseURL}/chat/completions`,
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful tutor assistant for CampusLearn. Provide clear, educational answers to student questions. If you reference specific subjects or modules, mention them explicitly."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.choices[0].message.content.trim();
        } catch (error) {
            console.error('OpenAI API Error:', error.response?.data || error.message);
            throw new Error('Failed to generate AI response');
        }
    }

    buildPrompt(question, context) {
        let prompt = `A student asked: "${question}"\n\n`;

        if (context) {
            prompt += `Context from our database: ${context}\n\n`;
        }

        prompt += `Please provide a helpful, educational answer. If this relates to specific academic subjects or modules, mention them. Keep the response clear and focused on learning.`;

        return prompt;
    }

    async searchRelevantContent(question) {
        // This would integrate with your database to find relevant modules/tutors
        // For now, we'll return a simple context
        const keywords = this.extractKeywords(question);

        // In a real implementation, you would search your database here
        return `The student is asking about: ${keywords.join(', ')}.`;
    }

    extractKeywords(question) {
        // Simple keyword extraction - you can enhance this
        const commonWords = ['what', 'how', 'why', 'when', 'where', 'is', 'are', 'the', 'a', 'an'];
        const words = question.toLowerCase().split(/\s+/);
        return words.filter(word =>
            word.length > 3 && !commonWords.includes(word)
        ).slice(0, 5);
    }
}

module.exports = new OpenAIService();