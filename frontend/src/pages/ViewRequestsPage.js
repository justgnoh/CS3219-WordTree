import React from 'react'
import { Table, Badge, Button, Breadcrumb } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function ViewRequestsPage() {
    const history = useHistory();

    return (
        <div>
            <div className="ms-5 me-5">
            <h1>View Challenge Requests</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="/challenge">Challenges</Breadcrumb.Item>
                <Breadcrumb.Item active>View challenge requests</Breadcrumb.Item>
            </Breadcrumb>

            <Table responsive>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Username</th>
                    <th>Genres</th>
                    <th>Turns</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr onClick={() => console.log("clicked on row")}>
                        <td>dp</td>
                        <td>Arthur</td>
                        <td>
                            <Badge pill bg="warning" className="black-text">Horror</Badge>
                            <Badge pill bg="warning" className="black-text">Sci-Fi</Badge>
                        </td>
                        <td>
                            4 rounds
                        </td>
                        <td>
                        <Button variant="dark" size="sm" className="primary-color" onClick={()=> {
                            history.push("/challenge/arthur");
                        }}>Accept</Button>
                        </td>
                    </tr>
                    <tr onClick={() => console.log("clicked on row")}>
                        <td>user.uid</td>
                        <td>Kevin</td>
                        <td>
                            <Badge pill bg="warning" className="black-text">Crime</Badge>
                        </td>
                        <td>
                            6 rounds
                        </td>
                        <td>
                        <Button variant="dark" size="sm" className="primary-color">Accept</Button>
                        </td>
                    </tr>

                </tbody>
            </Table>
            
            </div>
        </div>
    )
}
