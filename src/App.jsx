import { useState, useRef } from 'react'

import gitHubLogo from "/github-mark.png"

import CsvTable from './components/CsvTable'

import DataTable from 'datatables.net-bs5';
import DataTablesLib from 'datatables.net-bs5';
import Responsive from 'datatables.net-responsive-bs5';

import papa from "papaparse"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';

import './App.css'

DataTable.use(DataTablesLib);
DataTable.use(Responsive);

function App() {

  const [data, setData] = useState([])
  const inputCsv = useRef(null)

  const[fileName, setFileName] = useState("No file opened");

  const fileChange = (emitter) => {

    const file = emitter.target.files[0];

    if(!file) return;

    setFileName(file.name)

    papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      delimiter: "",
      transformHeader: header => header.trim(),
      complete: (results) => {
        console.log("Parsing Complete:", results.data)
        setData(results.data);
      }
    });
  }

  const onClick = () =>  {
    inputCsv.current.click();
  }

  return (
    <>  
    <header>
      <h1 className="font-bold text-center">CSV Viewer</h1>
      <p className="uploadText text-center pb-2">File: {fileName}</p>     
    </header>

    <div className='uploadContainer flex-column'>
      <button className='pt-12' onClick={onClick}>Upload CSV</button>
      <input className='d-none' type="file" ref={inputCsv} onChange={fileChange} accept='.csv'></input>
      <label className='d-none'>Upload Button</label>
    </div>
      
    <div className='border-1 overflow-auto'>
      <CsvTable data={data}></CsvTable>
    </div>

    <footer>
      <p>Minimalistic CSV Viewer created by Lukas Waldhofer for the course "Web-Development" at the institute of Digital Humanities in Graz, Austria.</p>
      <a href='https://github.com/AquaWoid/csv-reader/tree/main'>Source Code available on GitHub <img src={gitHubLogo} className='img' alt="GitHub Logo depicting a white cat on a black circle background"/></a>
    </footer>
    </>
  )
}

export default App
