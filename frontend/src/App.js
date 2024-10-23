import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, Send, AlertCircle } from 'lucide-react';

// Simple Alert component
const Alert = ({ children }) => (
  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
    <span className="flex items-center">
      <AlertCircle className="mr-2" size={20} />
      {children}
    </span>
  </div>
);

const App = () => {
  const [pdfText, setPdfText] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js';
    script.async = true;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    try {
      const text = await extractTextFromPdf(file);
      setPdfText(text);
      setFileName(file.name+"- successfully uploaded, ready for questions");
    } catch (error) {
      console.error('Error extracting text:', error);
      setError('An error occurred while processing the PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  const extractTextFromPdf = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const typedarray = new Uint8Array(event.target.result);
          const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + ' ';
          }
          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleAskQuestion = async () => {
    if (!pdfText) {
      setError("Please upload a Bill in PDF format");
      return;
    }
    if (!question.trim()) {
      setError("Please enter a question about the bill.");
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that answers questions about a congress bill based on the given context. Provide the answer in a very simple manner that a 10 year old can understand the response" },
          { role: "user", content: `Context: ${pdfText}\n\nQuestion: ${question}` }
        ]
      }, {
        headers: {
          'Authorization': ``,
          'Content-Type': 'application/json'
        }
      });
      setAnswer(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Bills simplified for Kids!</h1>
        <div className="mb-6 flex justify-center">
          <img src="Congress Bills simplified for Kids.jpeg" width="400" height="300" alt="PDF Q&A Illustration" className="rounded-lg shadow-md" />
        </div>
        <br></br>
        <div className="flex flex-col items-center w-full mb-4">
          <div className="w-full mb-2">
            <label htmlFor="file-upload" className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
              <Upload className="mr-2" size={20} />
              {fileName ? 'Change PDF' : 'Upload Bill (as a pdf)'}
            </label>
            <input 
              id="file-upload"
              type="file" 
              accept=".pdf" 
              onChange={handleFileUpload}
              disabled={isLoading}
              className="hidden"
            />
          </div>
          {fileName && (
            <div className="text-sm text-gray-600 flex items-center mt-2">
              <FileText size={30} className="mr-1" />
              {fileName}
            </div>
          )}
        </div>
        <br></br>
        <div className="flex flex-col items-center w-full mt-4">
          <input 
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            placeholder="Ask your question"
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <button 
            onClick={handleAskQuestion} 
            disabled={isLoading || !pdfText}
            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400 w-full"
          >
            <Send className="mr-2" size={20} />
            Ask
          </button>
        </div>

        {isLoading && <div className="text-center text-gray-600 mt-4">Processing...</div>}

        {error && <Alert>{error}</Alert>}

        {answer && (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center">Answer:</h2>
            <p className="text-gray-600 bg-gray-100 p-3 rounded-md">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;