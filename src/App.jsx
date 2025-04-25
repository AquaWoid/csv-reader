import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import CsvTable from './CsvTable'

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


  const fileChange = (e) => {

    const file = e.target.files[0];

    if(!file) return;

    setFileName(file.name)
    console.log(file)
    console.log(fileName);

    papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      delimiter: ",",
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
    <h1 className="font-bold text-center">CSV Viewer</h1>
    <p className="uploadText text-center pb-2">File: {fileName}</p>


      <div className='flex flex-column pt-5 pb-5'>
      <button className='pt-12' onClick={onClick}>Upload CSV</button>
      </div>
      
      <input className='d-none' type="file" ref={inputCsv} onChange={fileChange} accept='.csv'></input>

      <div className='border-1 overflow-auto'>
      <CsvTable data={data}></CsvTable>
      </div>



    <footer>
      <p>Csv viewer to</p>
    </footer>
    </>
  )
}


export default App
