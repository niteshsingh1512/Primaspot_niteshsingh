import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Loader2, CheckCircle } from 'lucide-react';
import useStore from '../store/instaStore';

const DownloadPage = ({ profileData }) => {
  const { instaId } = useStore();
  const [downloading, setDownloading] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  // Format date for filename
  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Generate CSV for profile overview
  const generateProfileCSV = () => {
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Username', profileData?.username || 'N/A'],
      ['Display Name', profileData?.displayName || 'N/A'],
      ['Followers', profileData?.followers || 0],
      ['Following', profileData?.following || 0],
      ['Total Posts', profileData?.posts || 0],
      ['Verified', profileData?.verified ? 'Yes' : 'No'],
      ['Bio', `"${profileData?.bio || 'N/A'}"`],
      ['Average Likes', profileData?.avgLikes || 0],
      ['Average Comments', profileData?.avgComments || 0],
      ['Engagement Rate (%)', profileData?.engagementRate || 0],
      ['Quality Score', profileData?.qualityScore || 0],
    ];

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  // Generate CSV for audience demographics
  const generateAudienceCSV = () => {
    let csv = 'Demographic Type,Category,Percentage\n';
    
    // Age demographics
    if (profileData?.ages && profileData.ages.length > 0) {
      profileData.ages.forEach(age => {
        csv += `Age,${age.name},${(age.percent * 100).toFixed(2)}%\n`;
      });
    }

    // Gender demographics
    if (profileData?.genders && profileData.genders.length > 0) {
      profileData.genders.forEach(gender => {
        csv += `Gender,${gender.name},${(gender.percent * 100).toFixed(2)}%\n`;
      });
    }

    // Country demographics
    if (profileData?.countries && profileData.countries.length > 0) {
      profileData.countries.forEach(country => {
        csv += `Country,${country.name},${(country.percent * 100).toFixed(2)}%\n`;
      });
    }

    // City demographics
    if (profileData?.cities && profileData.cities.length > 0) {
      profileData.cities.forEach(city => {
        csv += `City,${city.name},${(city.percent * 100).toFixed(2)}%\n`;
      });
    }

    return csv;
  };

  // Generate comprehensive CSV with all data
  const generateCompleteCSV = () => {
    let csv = '=== PROFILE OVERVIEW ===\n';
    csv += generateProfileCSV() + '\n\n';
    csv += '=== AUDIENCE DEMOGRAPHICS ===\n';
    csv += generateAudienceCSV();
    return csv;
  };

  // Generate PDF content
  const generatePDF = () => {
    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Instagram Analytics Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      color: #333;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 3px solid #0095f6;
      padding-bottom: 20px;
    }
    .profile-pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 20px auto;
      display: block;
    }
    h1 {
      color: #0095f6;
      margin: 10px 0;
    }
    h2 {
      color: #262626;
      border-bottom: 2px solid #dbdbdb;
      padding-bottom: 10px;
      margin-top: 30px;
    }
    .section {
      margin: 30px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #dbdbdb;
    }
    th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 20px 0;
    }
    .metric-card {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #0095f6;
    }
    .metric-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .metric-value {
      font-size: 24px;
      font-weight: bold;
      color: #262626;
    }
    .footer {
      margin-top: 50px;
      text-align: center;
      color: #999;
      font-size: 12px;
      border-top: 1px solid #dbdbdb;
      padding-top: 20px;
    }
    @media print {
      body { margin: 20px; }
      .metric-grid { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${profileData?.profilePicture || ''}" alt="Profile" class="profile-pic" />
    <h1>${profileData?.displayName || 'N/A'}</h1>
    <p style="font-size: 18px; color: #666;">@${profileData?.username || 'N/A'}</p>
    <p style="font-style: italic; color: #888;">${profileData?.bio || 'No bio available'}</p>
    ${profileData?.verified ? '<p style="color: #0095f6;">✓ Verified Account</p>' : ''}
  </div>

  <div class="section">
    <h2>Profile Overview</h2>
    <div class="metric-grid">
      <div class="metric-card">
        <div class="metric-label">Followers</div>
        <div class="metric-value">${(profileData?.followers || 0).toLocaleString()}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Following</div>
        <div class="metric-value">${(profileData?.following || 0).toLocaleString()}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Total Posts</div>
        <div class="metric-value">${(profileData?.posts || 0).toLocaleString()}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Engagement Metrics</h2>
    <div class="metric-grid">
      <div class="metric-card">
        <div class="metric-label">Avg Likes</div>
        <div class="metric-value">${(profileData?.avgLikes || 0).toLocaleString()}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Avg Comments</div>
        <div class="metric-value">${(profileData?.avgComments || 0).toLocaleString()}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Engagement Rate</div>
        <div class="metric-value">${profileData?.engagementRate || 0}%</div>
      </div>
    </div>
    <div class="metric-grid">
      <div class="metric-card">
        <div class="metric-label">Quality Score</div>
        <div class="metric-value">${((profileData?.qualityScore || 0) * 100).toFixed(1)}%</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Audience Demographics</h2>
    
    ${profileData?.ages && profileData.ages.length > 0 ? `
    <h3>Age Distribution</h3>
    <table>
      <tr>
        <th>Age Range</th>
        <th>Percentage</th>
      </tr>
      ${profileData.ages.map(age => `
        <tr>
          <td>${age.name.replace('_', '-')}</td>
          <td>${(age.percent * 100).toFixed(2)}%</td>
        </tr>
      `).join('')}
    </table>
    ` : ''}

    ${profileData?.genders && profileData.genders.length > 0 ? `
    <h3>Gender Distribution</h3>
    <table>
      <tr>
        <th>Gender</th>
        <th>Percentage</th>
      </tr>
      ${profileData.genders.map(gender => `
        <tr>
          <td>${gender.name}</td>
          <td>${(gender.percent * 100).toFixed(2)}%</td>
        </tr>
      `).join('')}
    </table>
    ` : ''}

    ${profileData?.countries && profileData.countries.length > 0 ? `
    <h3>Top Countries</h3>
    <table>
      <tr>
        <th>Country</th>
        <th>Percentage</th>
      </tr>
      ${profileData.countries.map(country => `
        <tr>
          <td>${country.name}</td>
          <td>${(country.percent * 100).toFixed(2)}%</td>
        </tr>
      `).join('')}
    </table>
    ` : ''}
  </div>

  <div class="footer">
    <p>Report Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
    <p>Instagram Analytics Dashboard</p>
  </div>
</body>
</html>
    `;

    return content;
  };

  // Download CSV file
  const downloadCSV = (type) => {
    setDownloading(type);
    
    setTimeout(() => {
      let csvContent = '';
      let filename = '';

      switch(type) {
        case 'profile':
          csvContent = generateProfileCSV();
          filename = `${profileData?.username}_profile_${getFormattedDate()}.csv`;
          break;
        case 'audience':
          csvContent = generateAudienceCSV();
          filename = `${profileData?.username}_audience_${getFormattedDate()}.csv`;
          break;
        case 'complete':
          csvContent = generateCompleteCSV();
          filename = `${profileData?.username}_complete_${getFormattedDate()}.csv`;
          break;
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();

      setDownloading(null);
      setDownloadSuccess(type);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 1000);
  };

  // Download PDF file
  const downloadPDF = () => {
    setDownloading('pdf');
    
    setTimeout(() => {
      const htmlContent = generatePDF();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${profileData?.username}_report_${getFormattedDate()}.html`;
      link.click();

      setDownloading(null);
      setDownloadSuccess('pdf');
      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Download Analytics</h1>
        <p className="text-slate-400">Export your influencer data and analytics in various formats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Overview CSV */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-green-500" />
            </div>
            {downloadSuccess === 'profile' && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Profile Overview CSV</h3>
          <p className="text-slate-400 text-sm mb-4">
            Download basic profile information including followers, engagement metrics, and bio
          </p>
          <ul className="text-slate-500 text-sm space-y-1 mb-6">
            <li>• Username & Display Name</li>
            <li>• Follower & Following Count</li>
            <li>• Engagement Metrics</li>
            <li>• Quality Score</li>
          </ul>
          <button
            onClick={() => downloadCSV('profile')}
            disabled={downloading === 'profile'}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading === 'profile' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download CSV
              </>
            )}
          </button>
        </div>

        {/* Audience Demographics CSV */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-purple-500" />
            </div>
            {downloadSuccess === 'audience' && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Audience Demographics CSV</h3>
          <p className="text-slate-400 text-sm mb-4">
            Download detailed audience breakdown by age, gender, location, and interests
          </p>
          <ul className="text-slate-500 text-sm space-y-1 mb-6">
            <li>• Age Distribution</li>
            <li>• Gender Split</li>
            <li>• Geographic Data</li>
            <li>• Top Cities</li>
          </ul>
          <button
            onClick={() => downloadCSV('audience')}
            disabled={downloading === 'audience'}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading === 'audience' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download CSV
              </>
            )}
          </button>
        </div>

        {/* Complete Data CSV */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-blue-500" />
            </div>
            {downloadSuccess === 'complete' && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Complete Analytics CSV</h3>
          <p className="text-slate-400 text-sm mb-4">
            Download all available data in a single comprehensive CSV file
          </p>
          <ul className="text-slate-500 text-sm space-y-1 mb-6">
            <li>• All Profile Data</li>
            <li>• All Audience Data</li>
            <li>• Engagement Statistics</li>
            <li>• Everything Combined</li>
          </ul>
          <button
            onClick={() => downloadCSV('complete')}
            disabled={downloading === 'complete'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading === 'complete' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download CSV
              </>
            )}
          </button>
        </div>

        {/* PDF Report */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-red-500 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-red-500/10 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-red-500" />
            </div>
            {downloadSuccess === 'pdf' && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">PDF Report</h3>
          <p className="text-slate-400 text-sm mb-4">
            Download a beautifully formatted PDF report with all analytics and visuals
          </p>
          <ul className="text-slate-500 text-sm space-y-1 mb-6">
            <li>• Professional Layout</li>
            <li>• Visual Charts & Tables</li>
            <li>• Print-Ready Format</li>
            <li>• Complete Overview</li>
          </ul>
          <button
            onClick={downloadPDF}
            disabled={downloading === 'pdf'}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading === 'pdf' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Download Information
        </h3>
        <ul className="text-slate-300 text-sm space-y-2">
          <li>• CSV files can be opened in Excel, Google Sheets, or any spreadsheet application</li>
          <li>• PDF reports are HTML-based and can be opened in any browser and printed</li>
          <li>• All files include the current date in the filename for easy organization</li>
          <li>• Downloads are generated in real-time based on the latest available data</li>
        </ul>
      </div>
    </div>
  );
};

export default DownloadPage;