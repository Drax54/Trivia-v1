#!/usr/bin/env python3
"""
OpenRouter API Client
A simple Python script to interact with OpenRouter's AI models.
"""

import os
from openai import OpenAI
import sys
from typing import Optional, List, Dict, Any

class OpenRouterClient:
    def __init__(self, api_key: Optional[str] = None, site_url: Optional[str] = None, site_name: Optional[str] = None):
        """
        Initialize the OpenRouter client.
        
        Args:
            api_key: OpenRouter API key (if not provided, will use environment variable)
            site_url: Your site URL for rankings on openrouter.ai (optional)
            site_name: Your site name for rankings on openrouter.ai (optional)
        """
        self.api_key = api_key or "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"
        self.site_url = site_url or "https://localhost:3001"
        self.site_name = site_name or "Trivia Quiz Website"
        
        # Initialize the OpenAI client with OpenRouter configuration
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=self.api_key,
        )
    
    def chat_completion(
        self, 
        messages: List[Dict[str, str]], 
        model: str = "deepseek/deepseek-r1-0528-qwen3-8b:free",
        **kwargs
    ) -> str:
        """
        Send a chat completion request to OpenRouter.
        
        Args:
            messages: List of message dictionaries with 'role' and 'content'
            model: Model to use (default: deepseek free model)
            **kwargs: Additional parameters for the completion request
            
        Returns:
            The response content from the AI model
        """
        try:
            completion = self.client.chat.completions.create(
                extra_headers={
                    "HTTP-Referer": self.site_url,
                    "X-Title": self.site_name,
                },
                extra_body={},
                model=model,
                messages=messages,
                **kwargs
            )
            return completion.choices[0].message.content
        except Exception as e:
            return f"Error: {str(e)}"
    
    def ask_question(self, question: str, model: str = "deepseek/deepseek-r1-0528-qwen3-8b:free") -> str:
        """
        Ask a simple question to the AI.
        
        Args:
            question: The question to ask
            model: Model to use
            
        Returns:
            The AI's response
        """
        messages = [{"role": "user", "content": question}]
        return self.chat_completion(messages, model)
    
    def generate_quiz_question(self, topic: str, difficulty: str = "medium") -> str:
        """
        Generate a quiz question for the trivia website.
        
        Args:
            topic: The topic for the quiz question
            difficulty: Difficulty level (easy, medium, hard)
            
        Returns:
            A formatted quiz question with multiple choice answers
        """
        prompt = f"""
        Generate a {difficulty} difficulty trivia question about {topic}.
        Format it as JSON with this structure:
        {{
            "question": "The question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_answer": 0,
            "explanation": "Brief explanation of the answer"
        }}
        
        Make sure the question is factual, clear, and has one clearly correct answer.
        """
        
        messages = [{"role": "user", "content": prompt}]
        return self.chat_completion(messages)
    
    def list_available_models(self) -> List[str]:
        """
        List some popular available models on OpenRouter.
        
        Returns:
            List of model names
        """
        return [
            "deepseek/deepseek-r1-0528-qwen3-8b:free",
            "meta-llama/llama-3.2-11b-vision-instruct:free",
            "microsoft/phi-3-mini-128k-instruct:free",
            "google/gemma-2-9b-it:free",
            "qwen/qwen-2.5-7b-instruct:free",
            "huggingfaceh4/zephyr-7b-beta:free",
            "mistralai/mistral-7b-instruct:free",
        ]

def main():
    """Main function to demonstrate the OpenRouter client."""
    print("🤖 OpenRouter AI Client")
    print("=" * 50)
    
    # Initialize the client
    client = OpenRouterClient()
    
    # Test with a simple question
    print("\n📝 Testing with a simple question...")
    response = client.ask_question("What is the meaning of life?")
    print(f"Response: {response}")
    
    # Generate a trivia question
    print("\n🎯 Generating a trivia question...")
    quiz_response = client.generate_quiz_question("science", "medium")
    print(f"Quiz Question: {quiz_response}")
    
    # Show available models
    print("\n🔧 Available Free Models:")
    for model in client.list_available_models():
        print(f"  • {model}")
    
    # Interactive mode
    print("\n💬 Interactive Mode (type 'quit' to exit):")
    while True:
        try:
            user_input = input("\nAsk me anything: ").strip()
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("👋 Goodbye!")
                break
            
            if user_input:
                response = client.ask_question(user_input)
                print(f"\n🤖 AI: {response}")
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main() 