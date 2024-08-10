import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InterviewPage from './pages/InterviewPage';
// 필요한 다른 페이지 컴포넌트도 임포트할 수 있습니다.

function App() {
    return (
        <Router>
            <Routes>
                {/* InterviewPage에 대한 경로 설정 */}
                <Route path="/" element={<InterviewPage />} />
                {/* 필요에 따라 다른 페이지를 추가할 수 있습니다 */}
                {/* 예: <Route path="/login" element={<LoginPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
