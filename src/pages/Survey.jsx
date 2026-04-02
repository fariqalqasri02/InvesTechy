import React, { useState } from 'react';
import Sidebar from '../components/sidebar.jsx';
import '../components/pages.css';

const Survey = () => {
  const [answers, setAnswers] = useState({});

  const surveySections = [
    {
      category: "Business Domain",
      questions: [
        {
          id: "bd_q1",
          text: "How does this investment link to your business goals?",
          options: [
            "This investment isn't directly linked to your goals.",
            "It doesn't directly hit your goals, but it will make operations smoother.",
            "Necessary foundation for other systems to hit targets.",
            "Directly helps achieve some of your goals.",
            "Directly hits all of your set goals."
          ]
        },
        {
          id: "bd_q2",
          text: "Does this investment create data sharing between stakeholders?",
          options: [
            "No data sharing involved.",
            "No sharing, but boosts competitive edge via efficiency.",
            "Strengthens competitive position via work efficiency.",
            "Offers some external data sharing.",
            "Provides plenty of data access and boosts competitive edge."
          ]
        }
      ]
    },
    {
      category: "Technology Domain",
      questions: [
        {
          id: "td_q1",
          text: "How clear were the requirements before the project started?",
          options: ["Very unclear", "Unclear", "Somewhat clear", "Mostly clear", "Clear", "Very clear"]
        }
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseData = JSON.parse(sessionStorage.getItem('temp_project_base') || '{}');
    const finalData = { ...baseData, surveyAnswers: answers };
    
    console.log("FINAL DATA UNTUK API:", finalData);
    alert("Survey Submitted! Data siap dikirim ke API.");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="New Project" />
      <main className="main-content">
        <h1 className="page-title">Survey</h1>
        <p className="page-subtitle">Part 2: Answer these questions for detailed analysis</p>

        <form onSubmit={handleSubmit}>
          {surveySections.map((section) => (
            <div key={section.category}>
              <h2 className="survey-section-title">{section.category}</h2>
              {section.questions.map((q) => (
                <div key={q.id} className="survey-card">
                  <label className="question-label">{q.text}</label>
                  <div className="options-list">
                    {q.options.map((opt, i) => (
                      <label key={i} className="option-label">
                        <input 
                          type="radio" 
                          name={q.id} 
                          required 
                          onChange={() => setAnswers({...answers, [q.id]: opt})} 
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div style={{ overflow: 'hidden' }}>
            <button type="submit" className="btn-next">Submit</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Survey;