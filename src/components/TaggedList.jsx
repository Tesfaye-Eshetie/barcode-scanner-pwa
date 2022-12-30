import { useState, useEffect } from "react";
import { database, deleteTaggedList } from "../database/indexedDB";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import SearchTag from "/images/searchTag.png";

const TaggedList = () => {
  const [taggedList, setTaggedList] = useState([]);

  const getResults = async () => {
    (await database).getAll("taggedList").then((data) => {
      setTaggedList(data);
    });
  };

  const removeTaggedList = () => {
    deleteTaggedList("01");
  };

  useEffect(() => {
    getResults();
  }, [taggedList]);

  return (
    <Card
      className="border-0 rounded-3 shadow m-2"
      style={{ width: "350px", height: "228px" }}
    >
      <Card.Body>
        {taggedList.length ? (
          <div className="d-flex justify-content-center align-items-center">
            <Table
              className="d-flex flex-column mx-3 table-sm"
              style={{ fontSize: "12px", lineHeight: "18px" }}
            >
              <thead style={{ width: "292px", fontWeight: "700" }}>
                <tr className="d-flex justify-content-between align-items-center px-1">
                  <th>Asset ID</th>
                  <th>Tag ID</th>
                  <th>Synced</th>
                </tr>
              </thead>
              <tbody
                className="border-0 rounded-3 shadow"
                style={{
                  width: "292px",
                  minHeight: "78px",
                  fontWeight: "400",
                  backgroundColor: "#E8ECFC",
                }}
              >
                {taggedList.map((tag, i) => (
                  <tr
                    key={i}
                    className="d-flex justify-content-between align-items-center p-1"
                  >
                    <td>{tag.assetID}</td>
                    <td>{tag.tagID}</td>
                    <td>
                      {" "}
                      <span
                        className="btn btn-default btn-custom"
                        style={{
                          fontSize: "12px",
                          lineHeight: "18px",
                          fontWeight: "400",
                        }}
                        onClick={removeTaggedList}
                      >
                        Yes
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              alt="search tag"
              src={SearchTag}
              width="36.7"
              height="37.7"
              className="my-4 mx-auto"
            />
            <p
              className="text-center"
              style={{ width: "161px", fontSize: "12px", lineHeight: "18px" }}
            >
              Scan an asset to begin popuplating this list.
            </p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TaggedList;
