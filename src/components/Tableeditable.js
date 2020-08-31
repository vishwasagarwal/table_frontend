import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {Listall,CreateRow,DeleteRow,UpdateRow} from '../actions/table';
import {getCookie} from '../actions/auth'
import Alert from "@material-ui/lab/Alert"
 
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function Table() {
  const [error,setError]=React.useState();
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name',searchable:true },
      { title: 'Address', field: 'address' },
      { title: 'Pincode', field: 'pincode', type: 'numeric' },
      {
        title: 'City',
        field: 'city',
      },
      { title:"Country", field:'country'}
    ],
    data: [],
  });
  const token = getCookie('token');
  useEffect(()=>{
    Listall(token).then(Rowdata=>{
      if(Rowdata.error){
        setError(Rowdata.error);
      }
      else{
        setError('')
        setState((prevState) => {
          const data = [...prevState.data,...Rowdata];
          return { ...prevState, data };
        });
      }
    })
  },[token]);
const showError = () =>error?<Alert severity="error">{error}</Alert>:<div></div>
  return (
    <React.Fragment>
    {showError()}
    <MaterialTable
      icons={tableIcons}
      title="Table"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) => CreateRow(newData,token).then(newRow=>{
              if(newRow.error){
                setError(newRow.error)
              }
              else{
              setError('')
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newRow);
                return { ...prevState, data };
              });
        }}),
        onRowUpdate: (newData, oldData) => UpdateRow(newData,token).then(updateRow=>{
          if(updateRow.error){
            setError(updateRow.error)
          }else{
            setError('')
            setState((prevState) => {
              const data = [...prevState.data];
              data[data.indexOf(oldData)] = updateRow;
              return { ...prevState, data };
            });
          }
        }),
        onRowDelete: (oldData) => DeleteRow(oldData,token).then(result=>{
                    if(result.error){
                      setError(result.error)
                    }
                    else{
                      setError('')
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                  }}),
      }}
    />
    </React.Fragment>
  );
}
