import { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';


const CsvTable = ({ data }) => {
  
  const tableRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Destroy old DataTable if it exists
    if ($.fn.dataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    // Clear and rebuild table manually
    $(tableRef.current).empty();

    // Data mapping
    const columns = Object.keys(data[0] || {}).map((key) => ({
      title: key,
      data: key
    }));

    // Re-initialize
    $(tableRef.current).DataTable({
      data,
      columns,
      responsive: true
    });

  }, [data]);

  return <table ref={tableRef} className="table table-striped table-hover table-bordered" style={{ width: '100%' }} />;
};

export default CsvTable;