/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState} from "react";
import { Table } from "antd";
import { onShowSizeChange } from "./pagination";

const Datatable = ({ columns, dataSource, pagination, rowKey }) => {
  return (
    <Table
      className="table datanew dataTable no-footer"
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey || ((record) => record.id)}
      pagination={pagination}
    />
  );
};

export default Datatable;
