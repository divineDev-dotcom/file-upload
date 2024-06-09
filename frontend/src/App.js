import logo from './logo.svg';
import './App.css';
import FileUpload from './fileupload.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="react default  logo" />
      </header>
<FileUpload/>
    </div>
  );
}

export default App;
