import { useState, useEffect } from "react";
import { database } from "../database/indexedDB";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const TaggedList = () => {
  const [taggedList, setTaggedList] = useState([]);

  const getResults = async () => {
    (await database).getAll("barcode").then((data) => {
      setTaggedList(data);
    });
  };

  useEffect(() => {
    getResults();
  }, [taggedList]);

  return (
    <Card className="border-0">
      <Card.Body className="p-4"></Card.Body>
      <Table bordered hover className="table-sm">
        <thead>
          <tr>
            <th></th>
            <th>Asset ID</th>
            <th>Tag ID</th>
            <th>Synced</th>
          </tr>
        </thead>
        <tbody>
          {taggedList.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.id}</td>
              <td>{tag.assetID}</td>
              <td>{tag.tagID}</td>
              <td>Yes</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default TaggedList;
