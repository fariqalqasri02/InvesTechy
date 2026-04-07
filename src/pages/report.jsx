import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import '../components/report.css';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // State Dropdown
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  
  // State Logic
  const [filterStatus, setFilterStatus] = useState('');
  const [sortType, setSortType] = useState('newest'); 

  useEffect(() => {
    const dummyData = [
      { id: 1, name: 'Report 1', date: 'Fri, 19 Apr 2020', roi: '186%', status: 'Not Recommended' },
      { id: 2, name: 'Report 2', date: 'Sat, 20 Apr 2020', roi: '162%', status: 'Recommended' },
      { id: 3, name: 'Report 3', date: 'Thu, 18 Apr 2020', roi: '162%', status: 'Recommended' },
      { id: 4, name: 'Report 4', date: 'Sun, 21 Apr 2020', roi: '162%', status: 'Recommended' },
      { id: 5, name: 'Report 5', date: 'Wed, 17 Apr 2020', roi: '162%', status: 'Error' },
    ];
    setReports(dummyData);
    
    // Memicu animasi page transition setelah render pertama
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    let result = [...reports];

    if (filterStatus) {
      result = result.filter(item => item.status === filterStatus);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortType === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredReports(result);
  }, [reports, filterStatus, sortType]);

  return (
    <div className="report-container">
      <Sidebar activeMenu="Report List" />
      
      <main className={`report-content ${isLoaded ? 'page-fade-in' : ''}`}>
        <h1 className="report-title">Report List</h1>

        <div className="report-filters">
          {/* Dropdown Order By */}
          <div className="custom-dropdown">
            <button 
              className={`dropdown-btn ${isOrderOpen ? 'active' : ''}`} 
              onClick={() => { setIsOrderOpen(!isOrderOpen); setIsStatusOpen(false); }}
            >
              Order by
              <span className="arrow-icon-visible"></span>
            </button>
            
            {isOrderOpen && (
              <div className="dropdown-content border-style dropdown-animate">
                <div 
                  className={`menu-item ${sortType === 'newest' ? 'selected' : ''}`} 
                  onClick={() => { setSortType('newest'); setIsOrderOpen(false); }}
                >
                  Newest
                </div>
                <div 
                  className={`menu-item ${sortType === 'oldest' ? 'selected' : ''}`} 
                  onClick={() => { setSortType('oldest'); setIsOrderOpen(false); }}
                >
                  Oldest
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Status */}
          <div className="custom-dropdown">
            <button 
              className={`dropdown-btn ${isStatusOpen ? 'active' : ''}`} 
              onClick={() => { setIsStatusOpen(!isStatusOpen); setIsOrderOpen(false); }}
            >
              {filterStatus || 'Status'}
              <span className="arrow-icon-visible"></span>
            </button>
            
            {isStatusOpen && (
              <div className="dropdown-content border-style dropdown-animate">
                <div className="menu-item" onClick={() => { setFilterStatus(''); setIsStatusOpen(false); }}>All Status</div>
                <div className="menu-item" onClick={() => { setFilterStatus('Recommended'); setIsStatusOpen(false); }}>Recommended</div>
                <div className="menu-item" onClick={() => { setFilterStatus('Not Recommended'); setIsStatusOpen(false); }}>Not Recommended</div>
                <div className="menu-item" onClick={() => { setFilterStatus('Error'); setIsStatusOpen(false); }}>Error</div>
              </div>
            )}
          </div>
        </div>

        <div className="report-card">
          <h2 className="card-subtitle">History</h2>
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th className="text-left">Business Name</th>
                  <th>Date</th>
                  <th>ROI</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="row-animate">
                    <td className="report-name-cell">{report.name}</td>
                    <td className="report-date-cell">{report.date}</td>
                    <td><span className="roi-tag">{report.roi}</span></td>
                    <td>
                      <span className={`status-badge ${report.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="action-cell">
                      <button className="btn-open">Open</button>
                      <span className="v-divider">|</span>
                      <button className="btn-delete-text">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;