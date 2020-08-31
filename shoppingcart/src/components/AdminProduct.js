import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import UserNavbar from "./UserNavbar";

const api = axios.create({
  baseURL: `http://localhost:3002/products`,
});
function AdminProduct() {
  
  var columns = [
    {
      title: "Product Name",
      field: "productName",
    },
    { title: "Price", field: "price" , type: "numeric"},

    {
      title: "Product Image Url",
      field: "productImage",
    },
    {
      title: "quantity",
      field: "quantity",type:"numeric"
    },
    { title: "category", field: "category" },

    { title: "Description", field: "description" },
    // {
    //   title: "Birth Place",
    //   field: "birthCity",
    //   lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    // },
  ];

  const [data, setData] = useState([]);

  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        console.log(res.data.products);
        setData(res.data.products);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.productName === "") {
      errorList.push("Please enter productName company name");
    }
    if (newData.price === "") {
      errorList.push("Please enter price");
    }
    if (newData.productImage === "") {
      errorList.push("Please enter url for productImage");
    }
    if (newData.quantity === "") {
      errorList.push("Please enter quantity");
    }
    if (newData.category === "") {
      errorList.push("Please enter category");
    }
    if (newData.description === "") {
      errorList.push("Please enter description");
    }

    if (errorList.length < 1) {
      api
        .patch("/" + newData._id, newData)
        .then((res) => {
          
          const dataUpdate = [...data];
          const index = oldData.tableData._id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.productName === "") {
      errorList.push("Please enter productName company name");
    }
    if (newData.price === "") {
      errorList.push("Please enter price");
    }
    if (newData.productImage === "") {
      errorList.push("Please enter url for productImage");
    }
    if (newData.quantity === "") {
      errorList.push("Please enter quantity");
    }
    if (newData.category === "") {
      errorList.push("Please enter category");
    }
    if (newData.description === "") {
      errorList.push("Please enter description");
    }

    if (errorList.length < 1) {
      //no error
      api
        .post("/", newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    console.log(oldData);
    api
      .delete("/" + oldData._id)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData._id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className="">
      <Grid container spacing={1}>
        <Grid item xs={1} style={{width:"100%"}}></Grid>
        <Grid item xs={0}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            title="Manage Products"
            columns={columns}
            data={data}
            // icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}
export default AdminProduct