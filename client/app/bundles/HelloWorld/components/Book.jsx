import React from 'react';
export default class Book extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Purchased Date</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}