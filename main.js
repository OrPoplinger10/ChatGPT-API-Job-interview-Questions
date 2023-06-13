 async function generate() {
     try {

        // Take html element:
        const programmingLanguageBox = document.getElementById("programmingLanguageBox");
        const difficultyBox = document.getElementById("difficultyBox");
        const countBox = document.getElementById("countBox");
        const questionDiv = document.getElementById("questionDiv");

        // Extract values:
        const language = programmingLanguageBox.value;
        const difficulty = difficultyBox.value;
        const count = countBox.value;

        // Create prompt:
        const prompt = generatePrompt(language, difficulty, count);

        // Get the completion:
        const completion = await getCompletion(prompt);

        // Display:
        questionDiv.innerHTML = completion;

    }
    catch(err) {
        alert(err.message)
    }
}

function generatePrompt(language, difficulty, count) {
     
     let prompt = `
     Write ${count} job interview questions and answers for${language} programming language.
     Each question should be suitable for${difficulty} difficulty level.
     Return all in a json array. Each item is a json object containing the question and the answer.
     Example: [
      {"question": "some question", "answer": "the answer"}, 
      {"question": "another question", "answer": "the answer"}
     ]`
    
     return prompt.trim();
}

 async function getCompletion(prompt) {

    //API Key:
    const apiKey ="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";

    // URL :
    const url ="https://api.openai.com/v1/completions";

   // Request body:
   const body = {
     prompt, // The prompt
     model:"text-davinci-003", // ChatGPT algorithm
     max_tokens: 2500 //Max completion tokens
 
 };

 // options: 
 const options = {
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify(body)

 };

 // Fetch:
 const response = await fetch(url, options);
 const json = await response.json();

 // If there is an error:
 if(response.status >= 400) throw json.error;

 // Extract the completion:
 const completion = json.choices[0].text;

 // Return completion
 return completion;
}